import streamBackground from './streamBackground'

let creating = false
let created = false
const imageId = 'kaleidoscope-image'

let imageLoadedListeners = []

const createKaleidoscopeImageElement = onImageLoaded => {
  imageLoadedListeners.push(onImageLoaded)
  if (creating) {
    if (created) {
      onImageLoaded(imageId)
    }
    return
  }

  creating = true
  const img = document.createElement('img')
  // img.onload = onImageLoaded
  img.id = imageId
  img.style.display = 'none'
  img.src = ''
  const completed = () => {
    console.log('image complete')
    created = true
    debugger
    imageLoadedListeners.forEach(listener => listener(imageId))
  }

  document.body.insertBefore(img, document.body.firstChild)

  streamBackground(img, 'sorted-paths.json', completed)
  return img.id
}

export default createKaleidoscopeImageElement
