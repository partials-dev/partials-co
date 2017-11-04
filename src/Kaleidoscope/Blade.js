import PIXI from './PIXI'
import BladeMask from './BladeMask'

class KaleidoscopeSprite extends PIXI.extras.TilingSprite {
  static fromStreamTexture (streamTexture, width, height, debugMasks) {
    const sprite = new KaleidoscopeSprite(streamTexture.texture, width, height)
    streamTexture.onDone(() => setTimeout(() => sprite.dispatchLoaded()))

    sprite.anchor.set(0.5)
    if (!debugMasks) {
      sprite.mask = new BladeMask()
      return sprite
    } else {
      return { mask: new BladeMask() }
    }
  }
  constructor (texture, width, height) {
    super(texture, width, height)
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
  constructor (i, streamTexture, app, center, numberOfBlades, debugMasks = false) {
    const offset = ((2 * Math.PI) / numberOfBlades)
    const image = KaleidoscopeSprite.fromStreamTexture(streamTexture, app.renderer.width * 2, app.renderer.height * 2, debugMasks)
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
  onLoadProgress (listener) {
    this.image.onLoadProgress(listener)
  }
  get loaded () {
    return this.image.loaded
  }
}

export default Blade
