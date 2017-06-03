import { h } from 'preact' /** @jsx h */
import updateTitle from '../updateTitle'

const Music = props => {
  updateTitle('Music | Partials')
  return (<main>
    <h2>Music</h2>
    These are our musics.
  </main>)
}

export default Music
