import Kaleidoscope from '../Kaleidoscope'
import Preact, { h } from 'preact' /** @jsx h */
import isServer from '../isServer'

class KaleidoscopeCanvas extends Preact.Component {
  constructor (...args) {
    super(...args)
    this.state = { loaded: false, showImage: false }
  }
  componentDidMount () {
    const options = Object.assign({}, this.props, { view: this.canvas })
    this.kaleidoscope = new Kaleidoscope(options)
    this.kaleidoscope.onLoaded(() => {
      console.log('kaleidoscope loaded')
      this.setState({ loaded: true })
    })
  }
  render (props, state) {
    const ref = canvas => {
      if (!this.canvas) {
        this.canvas = canvas
      }
    }
    if (this.kaleidoscope) {
      this.kaleidoscope.setImage(props.imageSource)
      this.kaleidoscope.setPanSpeed(props.xPanSpeed, props.yPanSpeed)
      this.kaleidoscope.setTilePosition(props.tilePosition)
    }

    let blur = 'blur'
    if (state.loaded) {
      blur = ''
    }
    return <canvas id='kaleidoscope' class={blur} ref={ref} />
  }
}

export default KaleidoscopeCanvas
