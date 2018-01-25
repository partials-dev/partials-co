const defaultState = {
  slices: 7,
  xPanSpeed: -0.5,
  yPanSpeed: 0.1,
  tilePosition: {
    x: -0.3,
    y: 0.1
  }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE_TILE_POSITION': {
      // const newTilePosition = addPositions(state.tilePosition, action.tilePosition)
      const newTilePosition = {
        x: action.tilePosition.x + state.xPanSpeed,
        y: action.tilePosition.y + state.yPanSpeed
      }

      const newState = Object.assign({}, state, {
        tilePosition: newTilePosition
      })
      return newState
    }
    default:
      return state
  }
}
