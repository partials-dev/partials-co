import { h } from 'preact' /** @jsx h */
import updateTitle from '../updateTitle'
import nbsp from '../nbsp'
import GlyphList from './GlyphList'

const booking = nbsp('BOOKING, ETC.')

// const Contact = props => {
//   updateTitle('Contact | Partials')
//   return (
//     <main class="center-contents contact">
//       <div class="center-text">
//         <h2>{booking}</h2>
//         <p class="big-text normal-spacing">mail@partialsband.com</p>
//         <div class="social-media-icons">
//           <a
//             href="https://www.facebook.com/partialsathens"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img
//               class="social-media-icon"
//               alt="facebook icon"
//               src="images/facebook-icon.png"
//             />
//           </a>
//           <a
//             href=
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img
//               class="social-media-icon"
//               alt="youtube icon"
//               src="images/youtube-icon.png"
//             />
//           </a>
//           <a
//             href=
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img
//               class="social-media-icon"
//               alt="instagram icon"
//               src="images/instagram-icon.png"
//             />
//           </a>
//         </div>
//       </div>
//     </main>
//   )
// }

// const SocialMediaIcons = () => (
//   <div class="social-media-icons">
//     <a
//       href="https://www.facebook.com/partialsathens"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <img
//         class="social-media-icon"
//         alt="facebook icon"
//         src="images/facebook-icon.png"
//       />
//     </a>
//     <a
//       href="https://www.youtube.com/channel/UCQh5Sxu9Rvtaqg7Fo4xMogw"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <img
//         class="social-media-icon"
//         alt="youtube icon"
//         src="images/youtube-icon.png"
//       />
//     </a>
//     <a
//       href="https://www.instagram.com/partials_music/"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <img
//         class="social-media-icon"
//         alt="instagram icon"
//         src="images/instagram-icon.png"
//       />
//     </a>
//   </div>
// )

const emailItems = [
  {
    text: 'Press',
    href: 'mailto:alyssa@riotactmedia.com'
  },
  {
    text: 'Radio',
    href: 'mailto:james@airplayjunkie.com'
  },
  {
    text: 'Booking, etc.',
    href: 'mailto:mail@partialsband.com'
  }
]

const socialMediaItems = [
  {
    text: 'Facebook',
    href: 'https://www.facebook.com/partialsathens'
  },
  {
    text: 'Instagram',
    href: 'https://www.instagram.com/partials_music/'
  },
  {
    text: 'YouTube',
    href: 'https://www.youtube.com/channel/UCQh5Sxu9Rvtaqg7Fo4xMogw'
  }
]

const Contact = props => {
  updateTitle('Contact | Partials')
  return (
    <main class="contact center-contents container">
      <div class="channels">
        <hr class="glyph" />
        <div class="left column">
          <GlyphList items={emailItems} />
        </div>
        <div class="right column">
          <GlyphList items={socialMediaItems} />
        </div>
        <hr class="glyph" />
      </div>
    </main>
  )
}

export default Contact
