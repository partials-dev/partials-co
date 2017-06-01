import FULLTILT from './FULLTILT'
import averageWindow from './averageWindow'

const getAveragedX = averageWindow(10)
const getAveragedY = averageWindow(10)

const setupOrientationInput = dispatch => {
  let lastGamma = null
  let lastBeta = null

  FULLTILT.getDeviceOrientation().then(deviceOrientation => {
    const updateKaleidoscopeFromOrientation = event => {
      // let beta = Math.sin(event.beta * 0.0174533)
      // let gamma = Math.cos((event.gamma * 0.0174533)) * (event.gamma / 90)
      const matrix = deviceOrientation.getScreenAdjustedMatrix()
      // console.log(matrix.elements[4])
      let beta = matrix.elements[4]
      let gamma = matrix.elements[2]
      if (lastBeta == null) {
        lastBeta = beta
        lastGamma = gamma
      }

      let db = beta - lastBeta
      let dg = gamma - lastGamma
      lastBeta = beta
      lastGamma = gamma

      const x = getAveragedX(db) * 400
      // const x = 0
      const y = getAveragedY(dg) * 400
      // const y = 0
      dispatch({ type: 'UPDATE_TILE_POSITION', tilePosition: { x, y } })

      window.requestAnimationFrame(updateKaleidoscopeFromOrientation)
    }
    updateKaleidoscopeFromOrientation()
  }).catch(message => {
    console.error(message)
    // Optionally set up fallback controls...
    // initManualControls();
  })
}

export default setupOrientationInput
