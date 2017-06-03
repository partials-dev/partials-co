import preact from 'preact'
import renderToString from 'preact-render-to-string'
import isServer from './isServer'

const render = (rootComponent, domElement) => {
  if (isServer()) {
    domElement.innerHTML = renderToString(rootComponent)
  } else {
    preact.render(rootComponent, domElement)
  }
}

export default render
