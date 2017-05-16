import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router/match'

const Navigation = () => {
  return <nav>
    <Link activeClassName='active' href='/'>Home</Link>
    <Link activeClassName='active' href='/glossolalia'>The New EP</Link>
    <Link activeClassName='active' href='/about'>About</Link>
  </nav>
}

export default Navigation
