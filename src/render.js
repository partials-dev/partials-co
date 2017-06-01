import preact from 'preact'
import renderToString from 'preact-render-to-string'
import isServerSide from './isServerSide'

const render = (rootComponent, domElement) => {
  if (isServerSide()) {
    domElement.innerHTML = renderToString(rootComponent)
  } else {
    preact.render(rootComponent, domElement)
  }
}

export default render
