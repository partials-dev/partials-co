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
    Batch._maxSize = Number(queryString.parse(window.location.search).batchSize) || 100
    console.log(`Rendering SVG paths in batches with maximum size ${Batch._maxSize}`)
    return Batch._maxSize
  }
  get isComplete () {
    return this.paths.length >= Batch.maxSize()
  }
  get size () {
    return this.paths.length
  }
  constructor () {
    this.paths = []
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
// render queue. Ten times a second, the RenderManager pulls the oldest batch
// from the render queue and asks the Renderer to render it.
class RenderManager {
  constructor (img) {
    this.currentBatch = new Batch()
    this.renderQueue = []
    this.renderer = new Renderer(img)
    this.hasRenderedFinalBatch = false
    this.isDone = false
    this.totalPaths = null // how many paths we're going to get over the network
    this.pathsRendered = 0
  }
  addToBatch (path) {
    if (this.isDone) {
      throw new Error('done() was already called on this RenderManager. Can\'t add more paths.')
    }
    this.currentBatch.push(path)
    if (this.currentBatch.isComplete) {
      this.renderQueue.push(this.currentBatch)
      this.currentBatch = new Batch()
    }
  }
  onBatchRendered (listener) {
    pubsub.on('batchRendered', listener)
  }
  onFinalBatchRendered (listener) {
    if (this.hasRenderedFinalBatch) {
      listener()
      return
    }
    pubsub.on('finalBatchRendered', listener)
  }
  startRenderLoop () {
    if (this.renderLoopIntervalId) {
      return
    }
    const renderNextBatch = () => this.renderNextBatch()
    this.renderLoopIntervalId = setInterval(renderNextBatch, 250)
  }
  stopRenderLoop () {
    clearInterval(this.renderLoopIntervalId)
  }
  renderNextBatch () {
    const nextBatch = this.renderQueue.shift()
    if (nextBatch) {
      this.renderer.render(nextBatch)
      this.pathsRendered += nextBatch.size
      pubsub.emit('batchRendered', this.getProgress())
      if (this.renderQueue.length === 0 && this.isDone) {
        pubsub.emit('finalBatchRendered')
        this.hasRenderedFinalBatch = true
        this.stopRenderLoop()
      }
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

class Streamer {
  constructor (img, url) {
    this.manager = new RenderManager(img)
    if (isBeingCrawledByReactSnapshot()) {
      return
    }
    this.manager.startRenderLoop()
    const handleMetadata = ({ totalPaths }) => {
      this.manager.totalPaths = totalPaths
    }

    const handlePath = node => {
      // Pass this to setTimeout so it gets called in the next tick of the event
      // loop instead of blocking.
      this.manager.addToBatch(node)
      // We've already stored the path to be rendered later,
      // so tell oboe not to keep this node in memory
      return oboe.drop
    }

    const handleNode = node => {
      if (node.totalPaths) {
        handleMetadata(node)
      } else {
        handlePath(node)
      }
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
      .node('*', handleNode)
      .done(handleDone)
  }
  onUpdate (listener) {
    this.manager.onBatchRendered(listener)
  }
  onDone (listener) {
    this.manager.onFinalBatchRendered(listener)
  }
}

export default Streamer
