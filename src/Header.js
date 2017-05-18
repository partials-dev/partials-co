import Navigation from './Navigation'
import Logo from './Logo'
import { h } from 'preact' /** @jsx h */

const Header = () => {
  return <div className='container'>
    <div className='header'>
      <Logo />
      <Navigation />
    </div>
  </div>
}

export default Header
