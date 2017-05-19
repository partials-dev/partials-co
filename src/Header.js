import Navigation from './Navigation'
import Logo from './Logo'
import { h } from 'preact' /** @jsx h */

const Header = () => {
  return <div className='container'>
    <div className='header' background="kaleidoscope.png">
		<div id="overlay">
		G L O S S A L A L I A
		<div id="action-button">
		Get our latest Ep
		</div>
		</div>
      <Logo />
      <Navigation />
    </div>
  </div>
}

export default Header
