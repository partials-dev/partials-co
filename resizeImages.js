require('dotenv').config()
const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')

const sourceDirectory = path.join(__dirname, 'src', 'images')
const buildDirectory = path.join(__dirname, 'public', 'images')

const contains = (array, value) => array.indexOf(value) >= 0

const isJPG = fileName =>
  contains(fileName.toLowerCase(), 'jpg') ||
  contains(fileName.toLowerCase(), 'jpeg')

const isPNG = fileName =>
  contains(fileName.toLowerCase(), 'png')

const isImage = fileName => {
  console.log('checking if ' + fileName + ' is image')
  return isJPG(fileName) || isPNG(fileName)
}

const readImages = directory => {
  const dir = fs.readdirSync(directory)
  console.log('read contents of ', directory)
  console.log('contained ', dir)
  return dir.filter(isImage)
}

// Operates on files in the *source* directory
const resizeImages = () => {
  const imageFiles = readImages(sourceDirectory)

  const awaitAllFiles = imageFiles.map(imageFile => readAndResize(imageFile))
  return Promise.all(awaitAllFiles)
}

const readAndResize = imageFile => {
  const imagePath = path.join(sourceDirectory, imageFile)
  return fs.readFile(imagePath)
    .then(data => resize(imagePath, data))
}

const widths = [320, 400, 768, 1000, 2000]
// const widths = [1000]
// const widths = [1]
const resize = (file, data) => {
  console.log('Resizing ', file)
  const awaitAllWidths = widths.map(width => {
    return resizeToWidth(file, data, width)
  })
  return Promise.all(awaitAllWidths)
}

const shouldProcess = fileName => fileName.indexOf('icon') < 0

const resizeToWidth = (filePath, data, width) => {
  let parsed = path.parse(filePath)
  let fileName = parsed.base // name + extension
  let image = sharp(data)
  if (shouldProcess(fileName)) {
    const awaitJpgResize = saveInBuildDirectory(image.resize(width, null), `${parsed.name}-${width}.jpg`)
    const awaitWebpResize = saveInBuildDirectory(image.resize(width, null), `${parsed.name}-${width}.webp`)
    return Promise.all([awaitJpgResize, awaitWebpResize])
  } else {
    return saveInBuildDirectory(image, fileName)
  }
}

const saveInBuildDirectory = (sharpImage, fileName) => {
  const newFilePath = path.join(buildDirectory, fileName)
  return sharpImage.toFile(newFilePath)
}

// Operates on files in the *build* directory
const createPlaceholders = () => {
  const imageFiles = readImages(buildDirectory)
  console.log('Creating placeholders.', imageFiles)
  imageFiles.filter(shouldProcess).forEach(imageFile => {
    const imagePath = path.join(buildDirectory, imageFile)
    console.log('Creating placeholder for ', imagePath)
    fs.readFile(imagePath, (err, data) => {
      if (err) throw err
      createPlaceholder(imagePath, data)
    })
  })
}

const placeholderScale = process.env.REACT_APP_PLACEHOLDER_SCALE
const createPlaceholder = (file, data) => {
  const parsed = path.parse(file)
  const image = sharp(data)
  const awaitJpg = image
      .metadata()
      .then(metadata =>
        image
          .resize(Math.round(metadata.width / placeholderScale))
          .jpeg({ quality: 1, progressive: true })
          .toFile(path.join(buildDirectory, `${parsed.name}-placeholder.jpg`))
      )
  const awaitWebp = image
      .metadata()
      .then(metadata =>
        image
          .resize(Math.round(metadata.width / placeholderScale))
          .webp({ quality: 1 })
          .toFile(path.join(buildDirectory, `${parsed.name}-placeholder.webp`))
      )
  return Promise.all([awaitJpg, awaitWebp])
}

fs.emptyDirSync(buildDirectory)
resizeImages().then(() => {
  createPlaceholders()
})
