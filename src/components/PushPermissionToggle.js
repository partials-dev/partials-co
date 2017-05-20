import { h, Component } from 'preact' /** @jsx h */
import latest from 'promise-latest'
import push from '../push'

const setLatestPushNotificationsEnabled = latest(push.setEnabled)

class PushPermissionToggle extends Component {
  constructor () {
    super()
    this.updateState()
  }
  updateState () {
    this.setState({
      show: !push.permissionDenied(),
      checked: push.isEnabled()
    })
  }
  onClick (e) {
    e.preventDefault()
    this.setState({ checked: !this.state.checked })
    setLatestPushNotificationsEnabled(this.state.checked).catch(error => {
      console.error('Latest attempt to update push notifications failed: ', error)
      this.updateState()
    })
  }
  render (props, state) {
    if (state.show && push.isSupported) {
      return <label>
        Get notified about new shows?
        <input type='checkbox' checked={state.checked} onClick={this.onClick.bind(this)} />
      </label>
    } else {
      return null
    }
  }
}

export default PushPermissionToggle
