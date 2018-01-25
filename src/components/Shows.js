import Preact, { h } from 'preact' /** @jsx h */
import Show from './Show'
import getShows from '../getShows'
import updateTitle from '../updateTitle'
import Spinner from './Spinner'

const li = props => (
  <li class="show">
    <Show {...props} />
  </li>
)
const showList = state => {
  if (state.shows && state.shows.length > 0) {
    return <ol class="shows">{state.shows.map(li)}</ol>
  } else if (state.shows && state.shows.length === 0) {
    return (
      <div class="center-text">
        <p>No shows on the books right now.</p>
      </div>
    )
  } else {
    return (
      <div class="loading center-contents">
        <Spinner />
      </div>
    )
  }
}

const awaitShows = getShows()

class Shows extends Preact.Component {
  componentWillMount () {
    awaitShows.then(shows => {
      this.setState({ shows })
    })
  }
  render (props, state) {
    updateTitle('Shows | Partials')
    state = state || {}
    const shouldCenterContents = state.shows && state.shows.length === 0
    const classes = shouldCenterContents
      ? 'container center-contents'
      : 'container'
    return <main className={classes}>{showList(state)}</main>
  }
}

export default Shows
