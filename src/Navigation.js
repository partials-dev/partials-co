import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router'

const Navigation = () => {
  return <nav>
    <Link href='/'>Home</Link>
    <Link href='/glossolalia'>The New EP</Link>
    <Link href='/about'>About</Link>
  </nav>
}

export default Navigation
