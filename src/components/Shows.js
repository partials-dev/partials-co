import Helmet from 'preact-helmet'
import { h } from 'preact' /** @jsx h */
import PushPermissionToggle from './PushPermissionToggle'

const Shows = props => {
  return (<div>
    <Helmet title='Shows | Partials' />
    <h2>Shows</h2>
    <PushPermissionToggle />
    These are our shows.
  </div>)
}

export default Shows
