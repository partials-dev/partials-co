import Kaleidoscope from '../Kaleidoscope'
import Preact, { h } from 'preact' /** @jsx h */

class KaleidoscopeCanvas extends Preact.Component {
  componentDidMount () {
    const options = Object.assign({}, this.props, { view: this.canvas })
    this.kaleidoscope = new Kaleidoscope(options)
  }
  render () {
    const style = {
      width: '100vw',
      height: '500px',
      position: 'absolute',
      left: '0',
      top: '0',
      zIndex: -2
    }
    const ref = canvas => {
      this.canvas = canvas
    }
    if (this.kaleidoscope) {
      this.kaleidoscope.setImage(this.props.imageSource)
      this.kaleidoscope.setPanSpeed(this.props.xPanSpeed, this.props.yPanSpeed)
      this.kaleidoscope.setTilePosition(this.props.tilePosition)
    }
    return <canvas ref={ref} style={style} />
  }
}

export default KaleidoscopeCanvas
