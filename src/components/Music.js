import Helmet from 'preact-helmet'
import { h } from 'preact' /** @jsx h */

const Music = props => {
  return (<main>
    <Helmet title='Music | Partials' />
    <h2>Music</h2>
    These are our musics.
  </main>)
}

export default Music
