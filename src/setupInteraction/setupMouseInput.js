import averageWindow from './averageWindow'

const getAveragedX = averageWindow(15)
const getAveragedY = averageWindow(15)

const setupMouseInput = dispatch => {
  let normalizedMouseX = null
  let normalizedMouseY = null

  const updateMousePosition = event => {
    normalizedMouseX = event.clientX
    normalizedMouseY = event.clientY
  }

  window.addEventListener('mousemove', updateMousePosition)

  let lastNormalizedMouseX = null
  let lastNormalizedMouseY = null

  const updateKaleidoscopeFromMouse = () => {
    if (lastNormalizedMouseX == null) {
      lastNormalizedMouseX = normalizedMouseX
      lastNormalizedMouseY = normalizedMouseY
    }

    const db = normalizedMouseX - lastNormalizedMouseX
    const dg = normalizedMouseY - lastNormalizedMouseY

    lastNormalizedMouseX = normalizedMouseX
    lastNormalizedMouseY = normalizedMouseY

    const x = getAveragedX(db) * -2
    const y = getAveragedY(dg) * 2
    dispatch({ type: 'UPDATE_TILE_POSITION', tilePosition: { x, y }})
    window.requestAnimationFrame(updateKaleidoscopeFromMouse)
  }

  updateKaleidoscopeFromMouse()
}

export default setupMouseInput
