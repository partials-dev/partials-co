import SvgStreamCanvas from './SvgStreamCanvas'
import PIXI from './PIXI'

class SvgStreamTexture {
  constructor (url, initialPaths) {
    this.svgStreamCanvas = new SvgStreamCanvas(url, initialPaths)
    this.texture = PIXI.Texture.from(this.svgStreamCanvas.canvas)
    this.svgStreamCanvas.onUpdate(() => {
      setTimeout(() => this.texture.update())
    })
  }
  onUpdate (...args) {
    this.svgStreamCanvas.onUpdate(...args)
  }
  onDone (...args) {
    this.svgStreamCanvas.onDone(...args)
  }
}

export default SvgStreamTexture
