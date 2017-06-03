import { h } from 'preact' /** @jsx h */
import updateTitle from '../updateTitle'
import nbsp from '../nbsp'

const Contact = props => {
  updateTitle('Contact | Partials')
  return (<main class='center-contents'>
    <div class='center-text'>
      <h2>{nbsp('B O O K I N G,  E T C.')}</h2>
      <p class='big-text'>mail@partialsband.com</p>
      <div class='social-media-icons'>
        <img class='social-media-icon' src='images/FB-f-Logo__white_29.png' />
        <img class='social-media-icon' src='images/youtube-029.png' />
        <img class='social-media-icon' src='images/patreon-029.png' />
        <img class='social-media-icon' src='images/soundcloud-029.png' />
      </div>
    </div>
  </main>)
}

export default Contact
