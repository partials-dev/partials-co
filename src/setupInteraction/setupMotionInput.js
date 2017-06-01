import averageWindow from './averageWindow'

const getAveragedX = averageWindow(10)
const getAveragedY = averageWindow(10)

let vx = 0
let vy = 0

let px = 0
let py = 0

const setupMotionInput = dispatch => {
  const updateKaleidoscopeFromMotion = event => {
    if (Math.abs(event.acceleration.x) > 1) {
      vx += event.acceleration.x
    }

    dispatch({ type: 'UPDATE_PAN_SPEED', xPanSpeed: vx })
  }

  window.addEventListener('devicemotion', updateKaleidoscopeFromMotion)
}

export default setupMotionInput
