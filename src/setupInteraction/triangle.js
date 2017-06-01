const a = 1 // amplitude
const p = 180 // period

const p2 = p / 2
const p4 = p / 4
const coefficient = (2 * a) / p

const triangle = x => {
  const xModP = x % p
  const abs = Math.abs(xModP - p2)
  const y = coefficient * (abs - p4)
  return y
}

export default triangle
