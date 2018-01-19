import { h } from 'preact' /** @jsx h */
import Router from 'preact-router'
import Match from 'preact-router/match'

import Header from './Header'
import Footer from './Footer'

import Home from './Home'
import Contact from './Contact'
import Kaleidoscope from './Kaleidoscope'
import Shows from './Shows'
import Store from './Store'
import Analytics from './Analytics'
import Spinner from './Spinner'

const routes = (
  <Router>
    <Home path="/" />
    <Contact path="/contact" />
    <Shows path="/shows" />
    <Store path="/store" />
  </Router>
)

const renderContent = showSpinner => currentRoute => {
  const atHome = currentRoute.matches
  let hideContent = ''
  let content = routes
  if (showSpinner) {
    content = (
      <div class="loading center-contents">
        <Spinner />
      </div>
    )
  } else if (atHome) {
    hideContent = 'hide'
  }
  return (
    <div>
      <div class={`content full-width ${hideContent}`}>{content}</div>
      <Footer />
    </div>
  )
}

const App = ({ showSpinner }) => {
  const content = <Match path="/">{renderContent(showSpinner)}</Match>
  return (
    <div>
      <Header />
      <Kaleidoscope />
      {content}
      <Analytics />
    </div>
  )
}

export default App
