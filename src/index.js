import { h } from 'preact' /** @jsx h */
import App from './components/App'
import render from './render'
import awaitServiceWorkerRegistration from './awaitServiceWorkerRegistration'

import { Provider } from 'preact-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import setupInteraction from './setupInteraction/index'
import isBeingCrawledByReactSnapshot from './isBeingCrawledByReactSnapshot'

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducer, reduxDevTools)

const init = () => {
  const root = document.getElementById('root')
  let showSpinner = false
  if (isBeingCrawledByReactSnapshot()) {
    showSpinner = true
  }
  // clear out any prerendered content in root
  root.innerHTML = ''
  render(
    <Provider store={store}>
      <App showSpinner={showSpinner} />
    </Provider>,
    root
  )

  setupInteraction(store.dispatch.bind(store))
}

awaitServiceWorkerRegistration()

init()
