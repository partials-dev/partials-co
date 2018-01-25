import { h } from 'preact' /** @jsx h */
import updateTitle from '../updateTitle'
import { GlyphListItem } from './GlyphList'

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
  const emails = emailItems.map((item, index) => (
    <GlyphListItem {...item} index={index} />
  ))
  const socialMedia = socialMediaItems.map((item, index) => (
    <GlyphListItem {...item} index={index + emails.length} />
  ))

  return (
    <main class="contact center-contents container">
      <div class="channels">
        <hr class="glyph" />
        <ol class="glyph-list">
          <div class="left column">{emails}</div>
          <div class="right column">{socialMedia}</div>
        </ol>
        <hr class="glyph" />
      </div>
    </main>
  )
}

export default Contact
