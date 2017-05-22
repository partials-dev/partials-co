import { h } from 'preact' /** @jsx h */
import Router from 'preact-router'

import Header from './Header'
import Footer from './Footer'

import Home from './Home'
import Contact from './Contact'
import Merch from './Merch'
import Kaleidoscope from './Kaleidoscope'
import Shows from './Shows'
import Music from './Music'

import Analytics from './Analytics'

const App = () => {
  return (<div>
    <Header />
    <Kaleidoscope />
    <div class='body container'>
      <Router>
        <Home path='/' />
        <Contact path='/contact' />
        <Merch path='/merch' />
        <Shows path='/shows' />
        <Music path='/music' />
      </Router>
    </div>
    <Footer />
    <Analytics />
  </div>)
}

export default App
