import React from 'react'
import App from './App'
import { render } from 'react-snapshot'
import registerServiceWorker from './registerServiceWorker'

registerServiceWorker()

render(
  <App />,
  document.getElementById('root')
)
