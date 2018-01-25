import { h } from 'preact' /** @jsx h */
import Link from './Link'
import Links from './Links'
import nbsp from '../nbsp'

const LinkLinks = Links.map(Link)

const hideOnSmall = component => <span class="hide-on-small">{component}</span>

const A = <span class="inverted-a">A</span>
// const PARTI = nbsp('P A R T I ')
// const LS = nbsp(' L S')
const PARTI = nbsp('PARTI')
const LS = nbsp('LS')

const PARTIALS = (
  <span class="logo">
    {PARTI}
    {A}
    {LS}
  </span>
)

const logo = {
  href: '/',
  text: PARTIALS
}

const Header = () => {
  return (
    <nav class="header full-width center-contents">
      {hideOnSmall(LinkLinks[0])}
      {hideOnSmall(LinkLinks[1])}
      {Link(logo)}
      {hideOnSmall(LinkLinks[2])}
      {hideOnSmall(LinkLinks[3])}
    </nav>
  )
}

export default Header
