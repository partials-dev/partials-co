import { h } from 'preact' /** @jsx h */
import Links from './Links'
import Link from './Link'
import nbsp from '../nbsp'

// const listen = nbsp('l i s t e n')
// const free = nbsp('f r e e')

const listen = nbsp('listen')
const free = nbsp('free')

const LinkLinks = Links.map(l => {
  l.showIcon = false
  return Link(l)
})
const YouTube = {
  href: 'https://www.youtube.com/',
  icon: 'play_arrow',
  showIcon: false,
  text: <span>{listen}<br />{free}</span>,
  isExternal: true
}

const YouTubeLink = Link(YouTube)

// const glossolalia = `G L O S S O L ${<span class='inverted-a'>A</span>} L I A`
const glossol = 'GLOSSOL'
const a = <span class='inverted-a'>A</span>
const lia = 'LIA'

const ListenOnYouTube = () => {
  return (<a href='https://www.youtube.com' class='call-to-action hide-on-small'>
    <span class='album-title'>{glossol}{a}{lia}</span>
    <span class='inverted-button normal-spacing'>
      <span class='link-text'>LISTEN ON YOUTUBE</span>
    </span>
  </a>)
}

const tabMenuItem = (component, index) => {
  return (<span class='tab-menu-item center-contents'>
    {component}
  </span>)
}

const TabMenu = () =>
  <span class='tab-menu show-on-small center-contents call-to-action normal-spacing-on-extra-small bigger-links-on-extra-small'>
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
