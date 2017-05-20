import { h } from 'preact' /** @jsx h */
import Helmet from 'preact-helmet'
import PushPermissionToggle from './PushPermissionToggle'
import Hero from './Hero'

const Home = () => {
  return <div>
    <Helmet title='Partials' />
    <Hero />
    <PushPermissionToggle />
  </div>
}

export default Home
