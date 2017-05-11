import { h } from 'preact' /** @jsx h */
import Helmet from 'preact-helmet'
import Kaleidoscope from './Kaleidoscope'

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
