import { h } from 'preact' /** @jsx h */
import App from './components/App'
import render from './render'
import awaitServiceWorkerRegistration from './awaitServiceWorkerRegistration'

awaitServiceWorkerRegistration()

const root = document.getElementById('root')
// clear out any prerendered content in root
root.innerHTML = ''
render(<App />, root)
