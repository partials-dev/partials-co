import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Navigation from './Navigation'
import Home from './Home'
import About from './About'
import Glossolalia from './Glossolalia'
import Analytics from './Analytics'

const App = () => {
  return <Router>
    <div>
      <Navigation />
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/glossolalia' component={Glossolalia} />
      <Analytics />
    </div>
  </Router>
}

export default App
