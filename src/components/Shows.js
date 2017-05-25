import Helmet from 'preact-helmet'
import { h } from 'preact' /** @jsx h */
import PushPermissionToggle from './PushPermissionToggle'
import Show from './Show'

const shows = [
  {
    date: 'May 26 2017',
    location: 'George, WA, United States',
    venue: "Smith's Olde Bar",
    link: 'https://www.facebook.com/events/1896051557318043/'
  },
  {
    date: 'Jun 24 2017',
    location: 'Athens, GA',
    venue: 'AthFest',
    link: 'https://www.facebook.com/events/393752004323423/'
  }
]

const li = props =>
  <li class='show'>
    <Show {...props} />
  </li>

const Shows = props => {
  return (<main class='container'>
    <Helmet title='Shows | Partials' />
    <PushPermissionToggle />
    <ol class='shows'>
      {shows.map(li)}
    </ol>
  </main>)
}

export default Shows
