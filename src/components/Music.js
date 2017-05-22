import Helmet from 'preact-helmet'
import { h } from 'preact' /** @jsx h */

const Music = props => {
  return (<div>
    <Helmet title='Music | Partials' />
    <h2>Music</h2>
    These are our musics.
  </div>)
}

export default Music
