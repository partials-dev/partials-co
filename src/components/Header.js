import Logo from './Logo'
import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router/match'
import Links from './Links'

const hideOnSmall = component =>
  <span class='hide-on-small'>{component}</span>

const Header = () => {
  const A = <span class='inverted-a'>A</span>
  const PARTIALS = <span class='logo'>P A R T I {A} L S</span>
  return (<nav class='header full-width center-contents'>
    {hideOnSmall(Links[0])}
    {hideOnSmall(Links[1])}
    <Link activeClassName='active' href='/'>{PARTIALS}</Link>
    {hideOnSmall(Links[2])}
    {hideOnSmall(Links[3])}
  </nav>)
}

export default Header
