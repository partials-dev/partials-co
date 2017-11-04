import oboe from 'oboe'
import queryString from 'query-string'
import includes from 'lodash.includes'
import pubsub from './pubsub'
import isBeingCrawledByReactSnapshot from '../isBeingCrawledByReactSnapshot'

// Holds a group of svg path objects. We keep them together because they'll all
// be rendered at the same time.
class Batch {
  static maxSize () {
    if (Batch._maxSize) {
      return Batch._maxSize
    }
    Batch._maxSize = Number(queryString.parse(window.location.search).batchSize) || 200
    console.log(`Rendering SVG paths in batches with maximum size ${Batch._maxSize}`)
    return Batch._maxSize
  }
  get isComplete () {
    return this.paths.length >= Batch.maxSize()
  }
  get size () {
    return this.paths.length
  }
  constructor (paths = []) {
    this.paths = paths
  }
  push (path) {
    this.paths.push(path)
  }
  join () {
    return this.paths.join()
  }
}

// Tracks what batches of svg paths have been rendered to an img tag. Also
// renders new batches to the img.
class Renderer {
  static toDataUri (svgString) {
    return 'data:image/svg+xml,' + svgString

    // Encode svg into a data URI in an IE-friendly way.
    // More details: https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
    var uriPayload = encodeURIComponent(svgString) // encode URL-unsafe characters
      .replace(/%0A/g, '') // remove newlines
      .replace(/%20/g, ' ') // put spaces back in
      .replace(/%3D/g, '=') // ditto equals signs
      .replace(/%3A/g, ':') // ditto colons
      .replace(/%2F/g, '/') // ditto slashes
      .replace(/%22/g, "'"); // replace quotes with apostrophes (may break certain SVGs)

    return 'data:image/svg+xml,' + uriPayload;
  }
  constructor (img) {
    this.svgStart = `<svg viewBox="0 0 984 1065" height="1065.0px" width="984.0px" xmlns="http://www.w3.org/2000/svg" version="1.1">`
    this.paths = ''
    this.svgEnd = `</svg>`
    this.img = img
    this.render([]) // set img src to blank
  }
  render (batch) {
    this.paths += batch.join('') // concatenate batch with existing paths
    this.img.src = Renderer.toDataUri(this.svgStart + this.paths + this.svgEnd)
  }
}

// Takes svg paths as they are available from the network and adds them to the
// current batch of paths. Once the current batch is complete, it's added to the
// render queue. Ten times a second, the BatchManager pulls the oldest batch
// from the render queue and asks the Renderer to render it.
class BatchManager {
  constructor (img, metadata, initialPaths) {
    if (!metadata.totalPaths) {
      throw new Error(`Got invalid metadata. Expected totalPaths in ${JSON.stringify(metadata)}`)
    }
    this.totalPaths = metadata.totalPaths
    this.currentBatch = new Batch()
    this.renderQueue = []
    this.renderer = new Renderer(img)
    this.hasRenderedFinalBatch = false
    this.isDone = false
    this.pathsRendered = 0

    const initialBatch = new Batch(initialPaths)
    this.render(initialBatch)
  }
  addToBatch (path) {
    if (this.isDone) {
      throw new Error('done() was already called on this BatchManager. Can\'t add more paths.')
    }
    this.currentBatch.push(path)
    if (this.currentBatch.isComplete) {
      this.renderQueue.push(this.currentBatch)
      this.currentBatch = new Batch()
    }
  }
  onBatchRendered (listener) {
    pubsub.on('SvgStreamImage.batchRendered', listener)
  }
  onFinalBatchRendered (listener) {
    if (this.hasRenderedFinalBatch) {
      listener()
      return
    }
    pubsub.on('SvgStreamImage.finalBatchRendered', listener)
  }
  startRenderLoop () {
    if (this.renderLoopIntervalId) {
      return
    }
    const renderNextBatch = () => this.renderNextBatch()
    this.renderLoopIntervalId = setInterval(renderNextBatch, 200)
  }
  stopRenderLoop () {
    clearInterval(this.renderLoopIntervalId)
  }
  renderNextBatch () {
    const nextBatch = this.renderQueue.shift()
    if (nextBatch) {
      this.render(nextBatch)
    }
  }
  render (batch) {
    this.renderer.render(batch)
    this.pathsRendered += batch.size
    pubsub.emit('SvgStreamImage.batchRendered', this.getProgress())
    if (this.renderQueue.length === 0 && this.isDone) {
      pubsub.emit('SvgStreamImage.finalBatchRendered')
      this.hasRenderedFinalBatch = true
      this.stopRenderLoop()
    }
  }
  done () {
    const currentBatchInRenderQueue = includes(this.renderQueue, this.currentBatch)
    if (!currentBatchInRenderQueue) {
      this.renderQueue.push(this.currentBatch)
    }
    this.isDone = true
  }
  getProgress () {
    return this.pathsRendered / this.totalPaths
  }
}

class SvgStreamImage {
  constructor (url, initialPaths) {
    const metadata = initialPaths.shift()

    this.manager = new BatchManager(this.img, metadata, initialPaths)
    if (isBeingCrawledByReactSnapshot()) {
      return
    }
    this.manager.startRenderLoop()

    const handlePath = path => {
      // Pass this to setTimeout so it gets called in the next tick of the event
      // loop instead of blocking.
      this.manager.addToBatch(path)
      // We've already stored the path to be rendered later,
      // so tell oboe not to keep this node in memory
      return oboe.drop
    }

    const handleDone = () => {
      this.manager.done()
      console.log('done streaming')
    }

    // Oboe is a streaming JSON parser. It allows you to process parts of a large
    // JSON file before it's finished downloading from the network.
    // Load the svg paths for the image. They're sorted so that high level
    // features load earlier and fine details load later.
    // sorted-paths.json just contains an array of strings.
    this.stream = oboe(url)
      // This event listener (handlePath) gets called whenever Oboe gets a complete
      // element of the array from the network.
      .node('*', handlePath)
      .done(handleDone)
  }
  get img () {
    if (!this._img) {
      this._img = document.createElement('img')
      this._img.style.display = 'none'
      document.body.insertBefore(this.img, document.body.firstChild)
    }
    return this._img
  }
  onUpdate (listener) {
    this.manager.onBatchRendered(listener)
  }
  onDone (listener) {
    this.manager.onFinalBatchRendered(listener)
  }
}

export default SvgStreamImage
