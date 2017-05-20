const defaultState = {
  showControls: false,
  mouseMovedRecently: false,
  controlsHaveFocus: false,
  imageSourceInput: '',
  xPanSpeedInput: 0.15,
  yPanSpeedInput: 0.15
}

function updateShowControls (state) {
  const showControls = state.mouseMovedRecently || state.mouseIsHoveringOverControls || state.controlsHaveFocus
  const newState = Object.assign(
    {},
    state,
    { showControls }
  )
  return newState
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE_IMAGE_SOURCE_INPUT': {
      const newState = Object.assign(
        {},
        state,
        { imageSourceInput: action.imageSourceInput }
      )
      return newState
    }
    case 'UPDATE_X_PAN_SPEED_INPUT': {
      const newState = Object.assign(
        {},
        state,
        { xPanSpeedInput: action.xPanSpeedInput }
      )
      return newState
    }
    case 'UPDATE_Y_PAN_SPEED_INPUT': {
      const newState = Object.assign(
        {},
        state,
        { yPanSpeedInput: action.yPanSpeedInput }
      )
      return newState
    }
    case 'UPDATE_MOUSE_MOVED_RECENTLY': {
      const newState = Object.assign(
        {},
        state,
        {
          mouseMovedRecently: action.mouseMovedRecently
        }
      )
      return updateShowControls(newState)
    }
    case 'UPDATE_MOUSE_IS_HOVERING_OVER_CONTROLS': {
      const newState = Object.assign(
        {},
        state,
        {
          mouseIsHoveringOverControls: action.mouseIsHoveringOverControls
        }
      )
      return updateShowControls(newState)
    }
    case 'UPDATE_CONTROLS_HAVE_FOCUS': {
      const newState = Object.assign(
        {},
        state,
        {
          controlsHaveFocus: action.controlsHaveFocus
        }
      )
      return updateShowControls(newState)
    }
    default:
      return state
  }
}
