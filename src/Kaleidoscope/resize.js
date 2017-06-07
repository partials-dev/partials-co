import PIXI from './PIXI'
import debounce from './debounce'

const resize = (app, view) => {
  view.style.width = window.innerWidth + 'px'
  view.style.height = window.innerHeight + 'px'
  const { width, height } = view.getBoundingClientRect()
  app.renderer.resize(width * 2, height * 2)
  const newCenter = new PIXI.Point(app.renderer.width / 2, app.renderer.height / 2)
  return newCenter
}

const debouncedResize = debounce(resize, 200, { leading: true })

export default debouncedResize
