import { h } from 'preact' /** @jsx h */
import App from './App'
import render from './render'
import registerServiceWorker from './registerServiceWorker'

registerServiceWorker()

const root = document.getElementById('root')
// clear out any prerendered content in root
root.innerHTML = ''
render(<App />, root)
