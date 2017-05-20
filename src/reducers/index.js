import uiReducer from './ui'

const getId = url => {
  const parser = document.createElement('a')
  parser.href = url
  return parser.pathname.substring(1)
}

const defaultState = {
  slices: 7,
  imageSource: 'images/kaleidoscope-image-bw-1000.jpg',
  xPanSpeed: -0.3,
  yPanSpeed: 0.01,
  tilePosition: {
    x: 0,
    y: 0
  }
}

export default function (state = defaultState, action) {
  const ui = uiReducer(state.ui, action)
  state = Object.assign({}, state, { ui })
  switch (action.type) {
    case 'UPDATE_IMAGE_SOURCE': {
      const newState = Object.assign(
        {},
        state,
        { imageSource: action.imageSource }
      )
      const id = getId(newState.imageSource)
      window.history.pushState(null, null, '/' + id)
      // k.setImage(newState.imageSource)
      return newState
    }
    case 'UPDATE_PAN_SPEED': {
      const newState = Object.assign(
        {},
        state,
        {
          xPanSpeed: action.xPanSpeed || ui.xPanSpeedInput,
          yPanSpeed: action.yPanSpeed || ui.yPanSpeedInput
        }
      )
      // k.setSpeed(newState.xPanSpeed, newState.yPanSpeed)
      return newState
    }
    case 'UPDATE_TILE_POSITION': {
      // const newTilePosition = addPositions(state.tilePosition, action.tilePosition)
      const newTilePosition = { x: action.tilePosition.x + state.xPanSpeed, y: action.tilePosition.y + state.yPanSpeed }

      const newState = Object.assign(
        {},
        state,
        { tilePosition: newTilePosition }
      )
      return newState
    }
    default:
      return state
  }
}
