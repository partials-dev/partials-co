import Logo from './Logo'
import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router/match'

const Header = () => {
  const A = <span class='inverted-a'>A</span>
  const PARTIALS = <span class='logo'>P A R T I {A} L S</span>
  return (<nav class='header full-width center-contents'>
    <Link activeClassName='active' href='/contact'>contact</Link>
    <a href='/'>merch</a>
    <Link activeClassName='active' href='/'>{PARTIALS}</Link>
    <Link activeClassName='active' href='/shows'>shows</Link>
    <a href='/'>music</a>
  </nav>)
}

export default Header
