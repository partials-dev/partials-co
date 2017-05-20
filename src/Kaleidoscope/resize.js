import PIXI from './PIXI'

const resize = (app, view) => {
  const { width, height } = view.getBoundingClientRect()
  app.renderer.resize(width * 2, height * 2)
  const newCenter = new PIXI.Point(app.renderer.width / 2, app.renderer.height / 2)
  return newCenter
}

export default resize
