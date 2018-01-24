const fs = require('fs')
const window = require('svgdom')
const svg = require('svg.js')(window)

// create svg.js instance
const document = window.document
const draw = svg(document.documentElement)
const pathStrings = require('./paths').split('\n')

const parseAttributes = path => {
  const dataRegex = /d="[^"]*"/g // matches d="anything"
  const pathData = path
    .match(dataRegex)[0]
    .replace(/d=/g, '') // remove d=
    .replace(/"/g, '') // remove double quotes
  const fillRegex = /fill="[^"]*"/g
  const fill = path
    .match(fillRegex)[0]
    .replace(/fill=/g, '') // remove fill=
    .replace(/"/g, '') // remove double quotes
  return { pathData, fill }
}

const compare = (a, b) => {
  if (a > b) return 1
  if (a < b) return -1
  return 0
}

const comparePathLengths = (a, b) => compare(a.length(), b.length())
const pathToString = path => {
  const xmlnsRegex = /xmlns="[^"]*" /g
  const idRegex = /id="[^"]*" /g
  return path
    .svg()
    .replace(xmlnsRegex, '') // remove xmlns="http://www.w3.org/2000/svg"
    .replace(idRegex, '') // remove id="SvgjsPath1013"
}

const paths = pathStrings
  .map(parseAttributes)
  // instantiate path objects
  .map(({ pathData, fill }) => draw.path(pathData).fill(fill))
  // Sort so longest paths are at the top. This puts high level features
  // at the beginning of the array and fine details at the end of the array.
  .sort(comparePathLengths)
  .reverse()
  // convert back to strings for serialization
  .map(pathToString)

// prepend metadata
paths.unshift({ totalPaths: paths.length })

// These will be cached in the JS bundle so we have something to show
// without making an extra network request.
const cachedPaths = paths.slice(0, 20)

// These will be streamed over the network.
const networkPaths = paths.slice(cachedPaths.length, paths.length)

console.log(paths.slice(0, 4))

// save as json so we can use Oboe to stream the file into the browser later
fs.writeFileSync('./public/sortedPaths.json', JSON.stringify(networkPaths))

// save into the JS bundle so we don't need to make a network request to show a
// basic form of the kaleidoscope
fs.writeFileSync(
  './src/Kaleidoscope/cachedPaths.json',
  JSON.stringify(cachedPaths)
)
