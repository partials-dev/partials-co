require('dotenv').config()
const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')

const sourceDirectory = path.join(__dirname, 'src', 'images')
const buildDirectory = path.join(__dirname, 'public', 'images')

// Operates on files in the *source* directory
const resizeImages = () => {
  console.log('Resizing images.')
  const imageFiles = fs.readdirSync(sourceDirectory)

  const awaitAllFiles = imageFiles.map(imageFile => readAndResize(imageFile))
  return Promise.all(awaitAllFiles)
}

const readAndResize = imageFile => {
  const imagePath = path.join(sourceDirectory, imageFile)
  return fs.readFile(imagePath)
    .then(data => resize(imagePath, data))
}

const getResizedFileName = (file, width) => {
  const parsed = path.parse(file)
  return path.join(buildDirectory, `${parsed.name}-${width}.jpg`)
}

// const widths = [320, 400, 768, 1000, 2000]
const widths = [1000]
const resize = (file, data) => {
  console.log('Resizing ', file)
  const awaitAllWidths = widths.map(width => resizeToWidth(file, data, width))
  return Promise.all(awaitAllWidths)
}

const resizeToWidth = (file, data, width) => {
  const resizedFile = getResizedFileName(file, width)
  return sharp(data)
    .resize(width, null)
    .toFile(resizedFile)
}

// Operates on files in the *build* directory
const createPlaceholders = () => {
  console.log('Creating placeholders.')
  const imageFiles = fs.readdirSync(buildDirectory)

  imageFiles.forEach(imageFile => {
    const imagePath = path.join(buildDirectory, imageFile)
    console.log('Creating placeholder for ', imagePath)
    fs.readFile(imagePath, (err, data) => {
      if (err) throw err
      createPlaceholder(imagePath, data)
    })
  })
}

const getPlaceholderFileName = file => {
  const parsed = path.parse(file)
  return path.join(buildDirectory, `${parsed.name}-placeholder.jpg`)
}

const placeholderScale = process.env.REACT_APP_PLACEHOLDER_SCALE
const createPlaceholder = (file, data) => {
  const placeholderFile = getPlaceholderFileName(file)
  const image = sharp(data)
  return image
    .metadata()
    .then(metadata =>
      image
        .resize(Math.round(metadata.width / placeholderScale))
        .jpeg({ quality: 1 })
        .toFile(placeholderFile)
    )
}

fs.emptyDirSync(buildDirectory)
resizeImages().then(() => {
  createPlaceholders()
})
