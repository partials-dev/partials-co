import preact from 'preact'
import renderToString from 'preact-render-to-string'

const render = (rootComponent, domElement) => {
  if (navigator.userAgent.match(/Node\.js/i)) {
    domElement.innerHTML = renderToString(rootComponent)
  } else {
    preact.render(rootComponent, domElement)
  }
}

export default render
