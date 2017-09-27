const potrace = require('potrace')
const fs = require('fs')

const imagePath = './mph.png'
const config = { threshold: 180, steps: 1 }
potrace.posterize(imagePath, config, (err, svg) => {
  if (err) throw err
  fs.writeFileSync('./output.svg', svg)
})
