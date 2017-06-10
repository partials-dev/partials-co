import PIXI from './PIXI'
import BladeMask from './BladeMask'
import createKaleidoscopeImageElement from './createKaleidoscopeImageElement'

const placeholderTexture = PIXI.Texture.from(document.getElementById('kaleidoscope-placeholder-image'))

class KaleidoscopeSprite extends PIXI.extras.TilingSprite {
  static fromImage (source, width, height, debugMasks) {
    const sprite = new KaleidoscopeSprite(placeholderTexture, width, height)

    const onOriginalTextureLoaded = () => {
      const originalTexture = PIXI.Texture.from(document.getElementById(imageId))
      sprite.texture = originalTexture
      sprite.dispatchLoaded()
    }
    const imageId = createKaleidoscopeImageElement(onOriginalTextureLoaded)

    // sprite.scale.x = process.env.REACT_APP_PLACEHOLDER_SCALE
    // sprite.scale.y = process.env.REACT_APP_PLACEHOLDER_SCALE
    // originalTexture.baseTexture.on('loaded', () => {
    //   sprite.texture = originalTexture
    //   // sprite.scale.x = 1
    //   // sprite.scale.y = 1
    //   // console.log('Real texture has loaded.')
    //   sprite.dispatchLoaded()
    // })
    sprite.anchor.set(0.5)
    if (!debugMasks) {
      sprite.mask = new BladeMask()
      return sprite
    } else {
      return { mask: new BladeMask() }
    }
  }
  constructor (...args) {
    super(...args)
    this.textureLoadedListeners = []
    this.loaded = false
  }
  onLoaded (listener) {
    if (this.loaded) {
      listener()
    } else {
      this.textureLoadedListeners.push(listener)
    }
  }
  dispatchLoaded () {
    this.loaded = true
    this.textureLoadedListeners.forEach(listener => listener())
  }
}

const isEven = n => (n % 2) === 0

class KaleidoscopeContainer extends PIXI.Container {
  constructor (image, offset, center, i, numberOfBlades, debugMasks) {
    super()
    if (!debugMasks) {
      this.addChild(image, image.mask)
    } else {
      this.addChild(image.mask)
    }
    // this.pivot = this.center
    // this.position = center
    this.rotation = offset * i - (Math.PI / 2)
    if (isEven(i)) this.mirror(offset, numberOfBlades)
  }
  mirror (offset, numberOfBlades) {
    this.scale.x = -1
    if (isEven(numberOfBlades / 2)) this.rotation += offset
  }
  get center () {
    return new PIXI.Point(this.width / 2, this.height / 2)
  }
}

class Blade {
  constructor (i, imageSource, app, center, numberOfBlades, debugMasks = false) {
    const offset = ((2 * Math.PI) / numberOfBlades)
    const image = KaleidoscopeSprite.fromImage(imageSource, app.renderer.width * 2, app.renderer.height * 2, debugMasks)
    const container = new KaleidoscopeContainer(image, offset, center, i, numberOfBlades, debugMasks)
    image.mask.draw(offset)
    // app.stage.addChild(container)
    this.image = image
    this.container = container

    this.x = this.image.tilePosition.x
    this.y = this.image.tilePosition.y
  }
  update (center, delta, xPanSpeed, yPanSpeed, debugMasks, tilePosition) {
    if (!debugMasks) {
      // this.image.tilePosition.x = tilePosition.x - (xPanSpeed * delta)
      // this.image.tilePosition.y = tilePosition.y - (yPanSpeed * delta)
      this.image.tilePosition.x -= (xPanSpeed + tilePosition.x) * delta
      this.image.tilePosition.y -= (yPanSpeed + tilePosition.y) * delta
    }
    this.container.position = center
  }
  appDidResize (app) {
    this.image.height = app.renderer.height * 2.3
    this.image.width = app.renderer.width * 2.3
  }
  setImageTexture (texture) {
    this.image.texture = texture
  }
  destroy () {
    this.image.destroy()
    this.container.destroy()
  }
  onLoaded (listener) {
    this.image.onLoaded(listener)
  }
  get loaded () {
    return this.image.loaded
  }
}

export default Blade
