import { h } from 'preact' /** @jsx h */
import App from './components/App'
import render from './render'
import awaitServiceWorkerRegistration from './awaitServiceWorkerRegistration'

// redux stuff
import { Provider } from 'preact-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import setupInteraction from './setupInteraction/index'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducer, reduxDevTools)

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
