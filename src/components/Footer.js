import { h } from 'preact' /** @jsx h */
import Links from './Links'
import Link from './Link'

const LinkLinks = Links.map(l => {
  l.showIcon = true
  return Link(l)
})

const ListenOnYouTube = () =>
  <span class='call-to-action hide-on-small'>
    <span class='album-title'>G L O S S O L <span class='inverted-a'>A</span> L I A</span>
    <span class='listen-button'>
      <a href='/'>
        LISTEN ON YOUTUBE
      </a>
    </span>
  </span>

const tabMenuItem = component => {
  return (<span class='tab-menu-item'>
    {component}
  </span>)
}

const YouTube = { href: '/youtube', icon: 'play_arrow', showIcon: true, text: 'listen' }

const YouTubeLink = Link(YouTube)

const TabMenu = () =>
  <span class='tab-menu show-on-small'>
    {tabMenuItem(LinkLinks[0])}
    {tabMenuItem(LinkLinks[1])}
    {tabMenuItem(YouTubeLink)}
    {tabMenuItem(LinkLinks[2])}
    {tabMenuItem(LinkLinks[3])}
  </span>

const Footer = () =>
  <div class='footer full-width center-contents'>
    <ListenOnYouTube />
    <TabMenu />
  </div>

export default Footer
