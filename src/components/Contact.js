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
        <a href='https://www.facebook.com/partialcinema' target='_blank'><img class='social-media-icon' src='images/facebook-icon.png' /></a>
        <a href='https://www.youtube.com/channel/UCQh5Sxu9Rvtaqg7Fo4xMogw' target='_blank'><img class='social-media-icon' src='images/youtube-icon.png' /></a>
        <a href='https://www.patreon.com/partials' target='_blank'><img class='social-media-icon' src='images/patreon-icon.png' /></a>
        <a href='https://soundcloud.com/partialsmusic' target='_blank'><img class='social-media-icon' src='images/soundcloud-icon.png' /></a>
      </div>
    </div>
  </main>)
}

export default Contact
