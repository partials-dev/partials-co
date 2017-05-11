import React, { Component } from 'react'
import Analytics from './Analytics'
import Kaleidoscope from './Kaleidoscope'

class App extends Component {
  render () {
    return (
      <div>
        <div className='App'>
          <h2>We are Radiohead</h2>
          <p>
            We're making the music that you're listening to.
          </p>
        </div>
        <Kaleidoscope />
      </div>
    )
  }
}

export default App
