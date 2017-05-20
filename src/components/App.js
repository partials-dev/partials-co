import { h } from 'preact' /** @jsx h */
import Router from 'preact-router'

import Home from './Home'
import About from './About'
import Glossolalia from './Glossolalia'
import Analytics from './Analytics'
import Header from './Header'

const App = () => {
  return <div>
    <Header />
    <div class='container'>
      <Router>
        <Home path='/' />
        <About path='/about' />
        <Glossolalia path='/glossolalia' />
      </Router>
    </div>
    <Analytics />
  </div>
}

export default App
