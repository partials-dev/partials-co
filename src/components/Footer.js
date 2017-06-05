import { h } from 'preact' /** @jsx h */
import Links from './Links'
import Link from './Link'
import nbsp from '../nbsp'

const listen = nbsp('l i s t e n')
const free = nbsp('f r e e')

// const listen = nbsp('listen')
// const free = nbsp('free')

const LinkLinks = Links.map(l => {
  l.showIcon = false
  return Link(l)
})
const YouTube = {
  href: 'https://www.youtube.com/',
  icon: 'play_arrow',
  showIcon: false,
  text: `${listen} ${free}`,
  isExternal: true
}

const YouTubeLink = Link(YouTube)

const ListenOnYouTube = () => {
  return (<span class='call-to-action hide-on-small'>
    <span class='album-title'>G L O S S O L <span class='inverted-a'>A</span> L I A</span>
    <span class='inverted-button'>
      {Link({ YouTube, ...{ text: 'LISTEN ON YOUTUBE' } })}
    </span>
  </span>)
}

const tabMenuItem = (component, index) => {
  return (<span class='tab-menu-item center-contents'>
    {component}
  </span>)
}

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
