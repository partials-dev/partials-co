const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')

const sourceDirectory = path.join(__dirname, 'src', 'images')
const buildDirectory = path.join(__dirname, 'public', 'images')
const imageFiles = fs.readdirSync(sourceDirectory)

fs.emptyDirSync(buildDirectory)

imageFiles.forEach(imageFile => {
  const imagePath = path.join(sourceDirectory, imageFile)
  fs.readFile(imagePath, (err, data) => {
    if (err) throw err
    resize(imagePath, data)
  })
})

const getResizedFileName = (file, width) => {
  const parsed = path.parse(file)
  return path.join(buildDirectory, `${parsed.name}-${width}.jpg`)
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
