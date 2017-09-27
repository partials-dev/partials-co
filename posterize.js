const potrace = require('potrace')
const fs = require('fs')

const imagePath = './public/images/manley-palmer-hall-bw-1000.jpg'
const config = { threshold: 180, steps: 4 }
potrace.posterize(imagePath, config, (err, svg) => {
  if (err) throw err
  fs.writeFileSync('./output.svg', svg)
})
