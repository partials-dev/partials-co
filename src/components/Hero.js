import { h } from 'preact' /** @jsx h */
import Kaleidoscope from './Kaleidoscope'

const Hero = () => {
  return <div id='hero'>
    <hgroup>
      <h1>G L O S S O L A L I A</h1>
      <p>The New EP, Out Now</p>
    </hgroup>
    <a href='' class='button' id='action-button'>
      Get the new EP
    </a>
  </div>
}

export default Hero
