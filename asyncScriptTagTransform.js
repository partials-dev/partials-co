const fs = require('fs')
const glob = require('glob')

console.log('')
console.log('😴  Adding async attribute to script tags')
console.log('')

const handleError = (context, error) => {
  console.error(
    'Error trying to perform <script> → <script async> in build directory'
  )
  console.error(context)
  console.error(error)
}

const transformHtml = (html, filename) => {
  const scriptSearchString = '<script'
  if (html.indexOf(scriptSearchString) < 0) {
    console.warn("Didn't find any script tags in " + filename)
  } else {
    return html.replace(/<script/g, '<script async')
  }
}

const transformFile = file => {
  console.log('Adding async attribute to script tags in ' + file)
  fs.readFile(file, 'utf8', (error, html) => {
    if (error) {
      handleError('Had a problem reading ' + file, error)
    } else {
      const transformed = transformHtml(html)
      fs.writeFile(file, transformed, error => {
        if (error) handleError('Had a problem saving ' + file, error)
      })
    }
  })
}

glob('build/*.html', (error, files) => {
  if (error) {
    handleError('Had a problem globbing files', error)
  } else if (files) {
    files.forEach(transformFile)
  } else {
    console.warn("Couldn't find any html files")
  }
})
