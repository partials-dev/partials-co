import { h } from 'preact' /** @jsx h */
import Router from 'preact-router'
import Match from 'preact-router/match'

import Header from './Header'
import Footer from './Footer'

import Home from './Home'
import Contact from './Contact'
import Merch from './Merch'
import Kaleidoscope from './Kaleidoscope'
import Shows from './Shows'
import Music from './Music'

import Analytics from './Analytics'

const routes = <Router>
  <Home path='/' />
  <Contact path='/contact' />
  <Merch path='/merch' />
  <Shows path='/shows' />
  <Music path='/music' />
</Router>

const renderContent = currentRoute => {
  const atHome = currentRoute.matches
  const hide = atHome ? 'hide' : null
  return (<div class={`content full-width ${hide}`}>
    {routes}
  </div>)
}

const content = <Match path='/'>
  {renderContent}
</Match>

const App = () => {
  return (<div>
    <Header />
    <Kaleidoscope />
    {content}
    <Footer />
    <Analytics />
  </div>)
}

export default App
