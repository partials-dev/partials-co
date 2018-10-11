// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-index-js": preferDefault(require("/Users/noisemachines/dev/partialsband.com/src/pages/index.js"))
}

