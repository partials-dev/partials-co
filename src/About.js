import Helmet from 'preact-helmet'
import { h } from 'preact' /** @jsx h */

const About = props => {
  return <div>
    <Helmet title='About | Partials' />
    <h2>About</h2>
    My name is Partials.
  </div>
}

export default About
