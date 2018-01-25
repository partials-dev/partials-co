import { h } from 'preact' /** @jsx h */
import App from './components/App'
import render from './render'
import awaitServiceWorkerRegistration from './awaitServiceWorkerRegistration'

import { Provider } from 'preact-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import setupInteraction from './setupInteraction/index'
import Raven from 'raven-js'

console.log("You've found a secret. Reopen this page using one of these links:")
console.log('https://partialsband.com/?kaleidoscope=glossolalia')
console.log('https://partialsband.com/?kaleidoscope=luz')

if (process.env.NODE_ENV === 'production') {
  Raven.config(
    'https://31fc87aa5aaf4cd5ba5ff310b708364e@sentry.io/276362',
    {}
  ).install()
}

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducer, reduxDevTools)

const init = () => {
  awaitServiceWorkerRegistration()
  const root = document.getElementById('root')
  // clear out any prerendered content in root
  root.innerHTML = ''
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  )

  setupInteraction(store.dispatch.bind(store))
}

if (process.env.NODE_ENV === 'production') {
  Raven.context(function () {
    init()
  })
} else {
  init()
}
