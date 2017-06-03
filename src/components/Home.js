import { h } from 'preact' /** @jsx h */
import updateTitle from '../updateTitle'

const Home = () => {
  updateTitle('Partials')
  return null
}

export default Home
