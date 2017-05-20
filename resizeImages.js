const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const imagesDirectory = path.join(__dirname, 'public', 'images')
const imageFiles = fs.readdirSync(imagesDirectory)

imageFiles.forEach(imageFile => {
  const imagePath = path.join(imagesDirectory, imageFile)
  fs.readFile(imagePath, (err, data) => {
    if (err) throw err
    resize(imagePath, data)
  })
})
const getResizedFileName = (file, width) => {
  const parsed = path.parse(file)
  return path.join(parsed.dir, `${parsed.name}-${width}.jpg`)
}

const widths = [320, 400, 768, 1000, 2000]
const resize = (file, data) => {
  widths.forEach(width => {
    const resizedFile = getResizedFileName(file, width)
    sharp(data)
      .resize(width, null)
      .toFile(resizedFile)
  })
}
