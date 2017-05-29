let pointingUp = true
let pointingLeft = false
let previousQuadrant = null
let currentQuadrant = null
let offset = 0


class OffsetCalculator {
  flippedTop (previousGamma, currentGamma) {
    const difference = previousGamma - currentGamma
    return Math.abs(difference) > 90
  }

  flippedSide (previous, current) {
    return (previous * current) < 0
  }

  quadrant (up, left) {
    if (up) {
      if (!left) return 1
      if (left) return 2
    } else if (!up) {
      // when the device is pointing down,
      // the user is looking up at it
      // so right and left are reversed
      const right = left
      if (!right) return 3
      if (right) return 4
    }
  }

  turnDirection (previousQuadrant, currentQuadrant) {
    if (previousQuadrant === 1 && currentQuadrant === 4) return 'clockwise'
    if (previousQuadrant === 4 && currentQuadrant === 1) return 'counterclockwise'
    if (previousQuadrant > currentQuadrant) return 'clockwise'
    if (previousQuadrant < currentQuadrant) return 'counterclockwise'
  }

  computeQuadrants (previousGamma, gamma) {
    let newPointingUp = pointingUp
    let newPointingLeft = pointingLeft

    let didFlipTop = false
    if (this.flippedTop(previousGamma, gamma)) {
      didFlipTop = true
      newPointingUp = !pointingUp
    }

    let didFlipSide = false
    if (this.flippedSide(previousGamma, gamma)) {
      didFlipSide = true
      newPointingLeft = !pointingLeft
    }

    previousQuadrant = this.quadrant(pointingUp, pointingLeft)
    pointingLeft = newPointingLeft
    pointingUp = newPointingUp
    currentQuadrant = this.quadrant(pointingUp, pointingLeft)
    return { previousQuadrant, currentQuadrant }
  }

  getOffset (previousGamma, gamma) {
    const { previousQuadrant, currentQuadrant } = this.computeQuadrants(previousGamma, gamma)
    const didFlipTop = (previousQuadrant < 3 && currentQuadrant >= 3) || (previousQuadrant >=3 && currentQuadrant < 3)
    if (didFlipTop) {
      const direction = this.turnDirection(previousQuadrant, currentQuadrant)
      switch (direction) {
        case 'clockwise':
          offset += 90 * 2
          break
        case 'counterclockwise':
          offset -= 90 * 2
          break
        default:
          break
      }
    }
    return offset
  }

  normalize (angle) {
    return ((angle / 90) + 1) / 2
  }
}

export default OffsetCalculator
