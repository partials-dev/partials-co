import SvgStreamImage from './SvgStreamImage'

class SvgStreamCanvas {
  constructor (url, initialPaths) {
    this.svgStreamImage = new SvgStreamImage(url, initialPaths)
    this.context.globalAlpha = 1
    this.svgStreamImage.onUpdate(progress => this.handleUpdate(progress))
    this.handleUpdate()
  }
  handleUpdate (progress) {
    setTimeout(() => {
      // context.clearRect(0, 0, canvas.width, canvas.height)
      this.context.drawImage(this.svgStreamImage.img, 0, 0)
    })
  }
  get canvas () {
    if (!this._canvas) {
      this._canvas = document.createElement('canvas')
      this._canvas.width = 1000
      this._canvas.height = 1000
      this._canvas.style.display = 'none'
      document.body.insertBefore(this._canvas, document.body.firstChild)
    }
    return this._canvas
  }
  get context () {
    return this.canvas.getContext('2d')
  }
  onUpdate (...args) {
    this.svgStreamImage.onUpdate(...args)
  }
  onDone (...args) {
    this.svgStreamImage.onDone(...args)
  }
}

export default SvgStreamCanvas
