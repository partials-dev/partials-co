import preact from 'preact'
import renderToString from 'preact-render-to-string'
import isBeingCrawledByReactSnapshot from './isBeingCrawledByReactSnapshot'

const render = (rootComponent, domElement) => {
  if (isBeingCrawledByReactSnapshot()) {
    domElement.innerHTML = renderToString(rootComponent)
    window.reactSnapshotRender()
  } else {
    preact.render(rootComponent, domElement)
  }
}

export default render
