import Kaleidoscope from '../Kaleidoscope'
import Preact, { h } from 'preact' /** @jsx h */

class KaleidoscopeCanvas extends Preact.Component {
  constructor (...args) {
    super(...args)
    this.state = { loaded: false }
  }
  componentDidMount () {
    const options = Object.assign({}, this.props, { view: this.canvas })
    this.kaleidoscope = new Kaleidoscope(options)
    this.kaleidoscope.onLoaded(() => {
      this.setState({ loaded: true })
    })
  }
  render (props, state) {
    // const style = {
    //   width: '100vw',
    //   height: '500px',
    //   zIndex: -2
    // }
    const ref = canvas => {
      this.canvas = canvas
    }
    if (this.kaleidoscope) {
      this.kaleidoscope.setImage(props.imageSource)
      this.kaleidoscope.setPanSpeed(props.xPanSpeed, props.yPanSpeed)
      this.kaleidoscope.setTilePosition(props.tilePosition)
    }
    return <canvas id='kaleidoscope' ref={ref} />
  }
}

export default KaleidoscopeCanvas
