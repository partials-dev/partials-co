const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const templateFilename = path.join(__dirname, 'src', 'service-worker.tmpl')

const rawTemplate = fs.readFileSync(templateFilename)
const templateCompiler = _.template(rawTemplate)

const widths = require('./ImageWidths')
const formats = require('./ImageFormats')

widths.forEach(width => {
  formats.forEach(format => {
    const imageEnding = `-${width}.${format}`
    const placeholderImageEnding = `-${width}-placeholder.${format}`
    const vars = {
      imageEnding,
      placeholderImageEnding,
      mainFilename: throw new Error('need to figure out the main file name')
    }
    const serviceWorkerJsFilename = path.join(__dirname, 'public', 'service-worker.js')
    const serviceWorkerJs = templateCompiler(vars)
    fs.writeFileSync(serviceWorkerJsFilename, serviceWorkerJs)
  })
})
