import { h } from 'preact' /** @jsx h */
import Links from './Links'
import Link from './Link'
import nbsp from '../nbsp'

const LinkLinks = Links.map(l => {
  l.showIcon = false
  return Link(l)
})

const ListenOnYouTube = () =>
  <span class='call-to-action hide-on-small'>
    <span class='album-title'>G L O S S O L <span class='inverted-a'>A</span> L I A</span>
    <span class='inverted-button'>
      <a href='/'>
        LISTEN ON YOUTUBE
      </a>
    </span>
  </span>

const tabMenuItem = (component, index) => {
  const even = (index % 2) === 0
  // const invertedButton = even ? 'inverted-button' : ''
  const invertedButton = ''
  return (<span class={`tab-menu-item ${invertedButton}`}>
    {component}
  </span>)
}

const listen = nbsp('l i s t e n')
const free = nbsp('f r e e')

const YouTube = {
  href: '/youtube',
  icon: 'play_arrow',
  showIcon: false,
  text: `${listen} ${free}`
}

const YouTubeLink = Link(YouTube)

const TabMenu = () =>
  <span class='tab-menu show-on-small center-contents call-to-action'>
    {tabMenuItem(LinkLinks[0], 0)}
    {tabMenuItem(LinkLinks[1], 1)}
    {tabMenuItem(YouTubeLink, 2)}
    {tabMenuItem(LinkLinks[2], 3)}
    {tabMenuItem(LinkLinks[3], 4)}
  </span>

const Footer = () =>
  <div class='footer full-width center-contents'>
    <ListenOnYouTube />
    <TabMenu />
  </div>

export default Footer
