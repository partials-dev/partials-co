import { connect } from 'preact-redux'
import KaleidoscopeCanvas from './KaleidoscopeCanvas'

const mapStateToProps = state => {
  return {
    slices: state.slices,
    imageSource: state.imageSource,
    xPanSpeed: state.xPanSpeed,
    yPanSpeed: state.yPanSpeed,
    tilePosition: state.tilePosition
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const Kaleidoscope = connect(mapStateToProps, mapDispatchToProps)(KaleidoscopeCanvas)
export default Kaleidoscope
