import { h } from 'preact' /** @jsx h */
import Helmet from 'preact-helmet'
import Kaleidoscope from './Kaleidoscope'
import PushPermissionToggle from './PushPermissionToggle'

const Home = () => {
  return <div>
    <Helmet title='Partials' />
    <div>
      <h1>Glossolalia</h1>
      <p>
        And we're making the music that you're listening to.
      </p>
      <PushPermissionToggle />
    </div>
    <Kaleidoscope />
  </div>
}

export default Home
