import { h } from 'preact' /** @jsx h */
import Router from 'preact-router'

import Navigation from './Navigation'
import Home from './Home'
import About from './About'
import Glossolalia from './Glossolalia'
import Analytics from './Analytics'

const App = () => {
  return <div>
    <Navigation />
    <Router>
      <Home path='/' />
      <About path='/about' />
      <Glossolalia path='/glossolalia' />
    </Router>
    <Analytics />
  </div>
}

export default App
