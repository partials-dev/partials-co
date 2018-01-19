import Preact, { h } from 'preact' /** @jsx h */
import PushPermissionToggle from './PushPermissionToggle'
import Show from './Show'
import getShows from '../getShows'
import updateTitle from '../updateTitle'
import Spinner from './Spinner'
// const shows = [
//   {
//     date: 'May 26 2017',
//     location: 'George, WA, United States',
//     venue: "Smith's Olde Bar",
//     link: 'https://www.facebook.com/events/1896051557318043/'
//   },
//   {
//     date: 'Jun 24 2017',
//     location: 'Athens, GA',
//     venue: 'AthFest',
//     link: 'https://www.facebook.com/events/393752004323423/'
//   }
// ]

const li = props => (
  <li class="show">
    <Show {...props} />
  </li>
)
const showList = state => {
  if (state.shows) {
    return <ol class="shows">{state.shows.map(li)}</ol>
  } else {
    return (
      <div class="loading center-contents">
        <p>loading shows</p>
        <Spinner />
      </div>
    )
  }
}

const awaitShows = getShows()

class Shows extends Preact.Component {
  componentWillMount() {
    awaitShows.then(shows => this.setState({ shows }))
  }
  render(props, state) {
    updateTitle('Shows | Partials')
    state = state || {}
    return (
      <main class="container">
        <PushPermissionToggle />
        {showList(state)}
      </main>
    )
  }
}

export default Shows
