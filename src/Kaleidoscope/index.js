import Blade from './Blade'
import PIXI from './PIXI'
import { resize, debouncedResize } from './resize'

PIXI.settings.PRECISION_FRAGMENT = 'highp'

// function countBackgroundPixels (pixels) {
//   const pixelInterval = 100 // Rather than inspect every single pixel in the image inspect every 5th pixel
//   let count = 0
//   let i = -4
//   const length = pixels.length
//
//   while ((i += pixelInterval * 4) < length) {
//     const r = pixels[i]
//     const g = pixels[i + 1]
//     const b = pixels[i + 2]
//     if (r === 226 && g === 226 && b === 226) {
//       count++
//     }
//   }
//
//   return count
// }

const assignDefaults = options => {
  const defaultOptions = {
    slices: 16,
    xPanSpeed: 0.15,
    yPanSpeed: 0.15
  }
  return Object.assign({}, defaultOptions, options)
}

class Kaleidoscope {
  constructor (options) {
    options = assignDefaults(options)
    this.texture = PIXI.loader.resources['kaleidoscope'].texture
    this.slices = options.slices * 2
    this.xPanSpeed = options.xPanSpeed
    this.yPanSpeed = options.yPanSpeed
    this.tilePosition = options.tilePosition
    const app = new PIXI.Application({ view: options.view, transparent: true })
    this.app = app
    this.blades = []
    this.onLoadedListeners = []
    this.container = new PIXI.Container()
    this.frameCount = 0

    const updateCenter = newCenter => {
      this.center = newCenter
      this.blades.forEach(blade => blade.appDidResize(app))
    }

    updateCenter(resize(app, options.view))

    window.addEventListener('resize', () =>
      debouncedResize(app, options.view).then(updateCenter)
    )

    this.createBlades(options.debugMasks)

    const updateBlades = delta => {
      this.blades.forEach(blade => {
        blade.update(
          this.center,
          delta,
          this.xPanSpeed,
          this.yPanSpeed,
          options.debugMasks,
          this.tilePosition
        )
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
  createBlades (debugMasks) {
    this.blades.forEach(blade => blade.destroy())
    const blades = []
    for (let i = 0; i < this.slices; i++) {
      blades.push(
        new Blade(
          i,
          this.texture,
          this.app,
          this.center,
          this.slices,
          debugMasks
        )
      )
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
