import { h } from 'preact' /** @jsx h */
import updateTitle from '../updateTitle'
import nbsp from '../nbsp'

// const booking = nbsp('B O O K I N G,  E T C.')
const booking = nbsp('BOOKING, ETC.')

const Contact = props => {
  updateTitle('Contact | Partials')
  return (<main class='center-contents'>
    <div class='center-text'>
      <h2>{booking}</h2>
      <p class='big-text normal-spacing'>mail@partialsband.com</p>
      <div class='social-media-icons'>
        <a href='https://www.facebook.com/partialcinema' target='_blank' rel='noopener noreferrer'>
          <img class='social-media-icon' alt='facebook icon' src='images/facebook-icon.png' />
        </a>
        <a href='https://www.youtube.com/channel/UCQh5Sxu9Rvtaqg7Fo4xMogw' target='_blank' rel='noopener noreferrer'>
          <img class='social-media-icon' alt='youtube icon' src='images/youtube-icon.png' />
        </a>
        <a href='https://www.patreon.com/partials' target='_blank' rel='noopener noreferrer'>
          <img class='social-media-icon' alt='patreon icon' src='images/patreon-icon.png' />
        </a>
        <a href='https://soundcloud.com/partialsmusic' target='_blank' rel='noopener noreferrer'>
          <img class='social-media-icon' alt='soundcloud icon' src='images/soundcloud-icon.png' />
        </a>
      </div>
    </div>
  </main>)
}

export default Contact
