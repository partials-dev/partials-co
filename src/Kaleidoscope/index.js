import Blade from './Blade'
import PIXI from './PIXI'
import { resize, debouncedResize } from './resize'

PIXI.settings.PRECISION_FRAGMENT = 'highp'

const assignDefaults = options => {
  const defaultOptions = {
    slices: 16,
    imageSource: 'oldplum.png',
    xPanSpeed: 0.15,
    yPanSpeed: 0.15
  }
  return Object.assign({}, defaultOptions, options)
}

class Kaleidoscope {
  constructor (options) {
    options = assignDefaults(options)
    this.slices = options.slices * 2
    if (process.env.REACT_APP_GENERATE_STATIC_PLACEHOLDER) {
      this.xPanSpeed = 0
      this.yPanSpeed = 0
    } else {
      this.xPanSpeed = options.xPanSpeed
      this.yPanSpeed = options.yPanSpeed
    }
    this.tilePosition = options.tilePosition
    const app = new PIXI.Application({ view: options.view, transparent: true })
    this.app = app
    this.blades = []
    this.onLoadedListeners = []
    this.container = new PIXI.Container()

    const updateCenter = newCenter => {
      this.center = newCenter
      this.blades.forEach(blade => blade.appDidResize(app))
    }

    updateCenter(resize(app, options.view))

    window.addEventListener(
      'resize',
      () => debouncedResize(app, options.view).then(updateCenter)
    )

    this.createBlades(options.imageSource, options.debugMasks)

    const updateBlades = delta => {
      this.blades.forEach(blade => {
        blade.update(this.center, delta, this.xPanSpeed, this.yPanSpeed, options.debugMasks, this.tilePosition)
      })
    }
    app.ticker.add(updateBlades)
    app.stage.addChild(this.container)
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
    // const texture = PIXI.Texture.fromImage(imageSource)
    // this.blades.forEach(blade => blade.setImageTexture(texture))
  }
  onLoaded (listener) {
    this.onLoadedListeners.push(listener)
  }
  dispatchLoaded () {
    this.onLoadedListeners.forEach(listener => listener())
  }
}

export default Kaleidoscope
