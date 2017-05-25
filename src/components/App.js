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
  <Shows path='/shows' />
</Router>

const renderContent = currentRoute => {
  const atHome = currentRoute.matches
  const hideContent = atHome ? 'hide' : ''
  const hideFooter = atHome ? '' : 'hide'
  return (<div>
    <div class={`content full-width ${hideContent}`}>
      {routes}
    </div>
    <Footer />
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
    <Analytics />
  </div>)
}

export default App
