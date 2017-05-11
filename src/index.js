import React from 'react'
import App from './App'
import { render } from 'react-snapshot'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

registerServiceWorker()

render(
  <App />,
  document.getElementById('root')
)
