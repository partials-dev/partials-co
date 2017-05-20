import averageWindow from './averageWindow'
import GammaOffsetCalculator from './GammaOffsetCalculator'
import BetaOffsetCalculator from './BetaOffsetCalculator'

const gammaOffsetCalculator = new GammaOffsetCalculator()
const betaOffsetCalculator = new BetaOffsetCalculator()
const getAveragedX = averageWindow(10)
const getAveragedY = averageWindow(10)

const normalizeGamma = gamma => ((gamma / 90) + 1) / 2
const normalizeBeta = beta => ((beta / 180) + 1) / 2

const setupOrientationInput = dispatch => {
  let lastRawGamma = null
  let lastGamma = null

  let lastRawBeta = null
  let lastBeta = null

  const updateKaleidoscopeFromOrientation = event => {
    let rawBeta = event.beta
    let beta = rawBeta

    let rawGamma = event.gamma
    let gamma = rawGamma

    beta += betaOffsetCalculator.getOffset(lastRawBeta, rawBeta)
    gamma += gammaOffsetCalculator.getOffset(lastRawGamma, rawGamma)

    if (lastBeta == null) {
      lastRawBeta = rawBeta
      lastBeta = beta
      lastRawGamma = rawGamma
      lastGamma = gamma
    }

    let db = betaOffsetCalculator.normalize(beta) - betaOffsetCalculator.normalize(lastBeta)    
    let dg = gammaOffsetCalculator.normalize(gamma) - gammaOffsetCalculator.normalize(lastGamma)
    //if (Math.abs(db) > 0.1) {
      //db = 0.005 * (db / Math.abs(db))
    //}
    //if (Math.abs(dg) > 0.1) {
      //dg = 0.005 * (dg / Math.abs(dg))
    //}

    lastRawBeta = rawBeta
    lastBeta = beta
    lastRawGamma = rawGamma
    lastGamma = gamma

    const x = getAveragedX(db) * 2000
    //const x = 0
    const y = getAveragedY(dg) * 2000
    //const y = 0
    dispatch({ type: 'UPDATE_TILE_POSITION', tilePosition: { x, y }})
  }

  window.addEventListener('deviceorientation', updateKaleidoscopeFromOrientation)
}

export default setupOrientationInput
