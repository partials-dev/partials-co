import React from 'react'
import Kaleidoscope from './Kaleidoscope'
import Helmet from 'react-helmet'

const Home = () => {
  return <div>
    <Helmet title='Partials' />
    <div>
      <h2>We are Radiohead</h2>
      <p>
        We're making the music that you're listening to.
      </p>
    </div>
    <Kaleidoscope />
  </div>
}

export default Home
