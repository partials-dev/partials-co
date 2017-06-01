import Blade from './Blade'
import PIXI from './PIXI'
import resize from './resize'

PIXI.settings.PRECISION_FRAGMENT = 'highp'

const assignDefaults = options => {
  const defaultOptions = {
    slices: 16,
    imageSource: 'oldplum.png',
    xPanSpeed: 0.15,
    yPanSpeed: 0.15,
    view: document.getElementById('kaleidoscope')
  }
  return Object.assign({}, defaultOptions, options)
}

const CLARIFY_RATE = 0.5

class Kaleidoscope {
  constructor (options) {
    options = assignDefaults(options)
    this.slices = options.slices * 2
    this.xPanSpeed = options.xPanSpeed
    this.yPanSpeed = options.yPanSpeed
    this.tilePosition = options.tilePosition
    const app = new PIXI.Application({ view: options.view })
    this.app = app
    this.blades = []
    this.onLoadedListeners = []
    this.container = new PIXI.Container()
    app.stage.addChild(this.container)
    const blurFilter = new PIXI.filters.BlurFilter()
    blurFilter.blur = 20
    this.container.filters = [blurFilter]

    const resizeApp = () => {
      this.center = resize(app, options.view)
      this.blades.forEach(blade => blade.appDidResize(app))
    }
    resizeApp()
    window.addEventListener('resize', resizeApp)

    this.createBlades(options.imageSource, options.debugMasks)

    const updateBlades = delta => {
      this.blades.forEach(blade => {
        blade.update(this.center, delta, this.xPanSpeed, this.yPanSpeed, options.debugMasks, this.tilePosition)
      })
    }
    app.ticker.add(updateBlades)
    this.onLoaded(() => {
      window.setTimeout(() => { this.unblur() }, 2000)
    })
  }
  setPanSpeed (xPanSpeed, yPanSpeed) {
    this.xPanSpeed = xPanSpeed
    this.yPanSpeed = yPanSpeed
  }
  setTilePosition (tilePosition) {
    this.tilePosition = tilePosition
  }
  createBlades (imageSource, debugMasks) {
    this.blades.forEach(blade => blade.destroy())
    const blades = []
    for (let i = 0; i < this.slices; i++) {
      blades.push(new Blade(i, imageSource, this.app, this.center, this.slices, debugMasks))
    }

    this.blades = blades

    blades.forEach(blade => {
      this.container.addChild(blade.container)
    })

    blades.forEach(blade => {
      blade.onLoaded(() => {
        const allBladesLoaded = blades.every(blade => blade.loaded)
        if (allBladesLoaded) this.dispatchLoaded()
      })
    })
  }
  setImage (imageSource, debugMasks) {
    const texture = PIXI.Texture.fromImage(imageSource)
    this.blades.forEach(blade => blade.setImageTexture(texture))
  }
  onLoaded (listener) {
    this.onLoadedListeners.push(listener)
  }
  dispatchLoaded () {
    this.onLoadedListeners.forEach(listener => listener())
  }
  unblur () {
    const ticker = new PIXI.ticker.Ticker()
    ticker.stop()
    ticker.add(deltaTime => {
      const blurFilter = this.container.filters[0]
      let newBlur = blurFilter.blur - (deltaTime * CLARIFY_RATE)
      if (newBlur < 0) {
        newBlur = 0
        ticker.destroy()
      }
      blurFilter.blur = newBlur
    })
    ticker.start()
  }
}

export default Kaleidoscope
