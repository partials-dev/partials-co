import { h } from 'preact' /** @jsx h */
import Router from 'preact-router'

import Home from './Home'
import About from './About'
import Glossolalia from './Glossolalia'
import Analytics from './Analytics'
import Header from './Header'
import Footer from './Footer'

const App = () => {
  return (<div>
    <Header />
    <div class='body container'>
      <Router>
        <Home path='/' />
        <About path='/about' />
        <Glossolalia path='/glossolalia' />
      </Router>
    </div>
    <Footer />
    <Analytics />
  </div>)
}

export default App
