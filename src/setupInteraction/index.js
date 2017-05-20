import detectModality from './detectModality'
import setupMouseInput from './setupMouseInput'
import setupOrientationInput from './setupOrientationInput'

const setupInteraction = dispatch => {
  detectModality().then(modality => {
    if (modality === 'mouse') {
      setupMouseInput(dispatch)
    } else if (modality === 'orientation') {
      setupOrientationInput(dispatch)
    }
  })
}

export default setupInteraction
