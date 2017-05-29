import detectModality from './detectModality'
import setupMouseInput from './setupMouseInput'
import setupOrientationInput from './setupOrientationInput'

const setupInteraction = dispatch => {
  detectModality().then(modality => {
    if (modality === 'mouse') {
      setupMouseInput(dispatch)
    } else if (modality === 'orientation') {
      const updatePanSpeed = {
        type: 'UPDATE_PAN_SPEED',
        xPanSpeed: -0.15,
        yPanSpeed: 0.005
      }
      dispatch(updatePanSpeed)
      setupOrientationInput(dispatch)
    }
  })
}

export default setupInteraction
