import { h, Component } from 'preact' /** @jsx h */
import latest from 'promise-latest'
import push from '../push'
import Toggle from './Toggle'

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
      const value = state.checked ? 'yes' : 'no'
      return (<div class='push-permission-toggle normal-spacing'>
        <label>
          Get notified about new shows?
          <Toggle
            checked={state.checked}
            value={value}
            onChange={this.onClick.bind(this)} />
        </label>
      </div>)
    } else {
      return null
    }
  }
}

export default PushPermissionToggle
