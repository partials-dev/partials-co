import { h } from 'preact' /** @jsx h */
import Router from 'preact-router'
import Match from 'preact-router/match'

import Header from './Header'
import Footer from './Footer'

import Home from './Home'
import Contact from './Contact'
import Kaleidoscope from './Kaleidoscope'
import Shows from './Shows'
import Press from './Press'
import Spinner from './Spinner'

const routes = (
  <Router>
    <Home path="/" />
    <Contact path="/contact" />
    <Shows path="/shows" />
    <Press path="/press" />
  </Router>
)

const renderContent = currentRoute => {
  const atHome = currentRoute.matches
  let hideContent = ''
  let content = routes
  if (atHome) {
    hideContent = 'hide'
  }
  return (
    <div>
      <div class={`content full-width ${hideContent}`}>{content}</div>
      <Footer />
    </div>
  )
}

const App = () => {
  const content = <Match path="/">{renderContent}</Match>
  return (
    <div>
      <Header />
      <Kaleidoscope />
      {content}
    </div>
  )
}

export default App
