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
  // img.src = '/images/manley-palmer-hall-bw original-1000.jpg'
  img.src = '/images/mph.svg'
  const intervalId = window.setInterval(() => {
    if (img.complete) {
      created = true
      window.clearInterval(intervalId)
      imageLoadedListeners.forEach(listener => listener(imageId))
    }
  }, 200)

  const picture = document.createElement('picture')
  //
  // const webp = document.createElement('source')
  // webp.type = 'image/webp'
  // webp.srcset = `/images/manley-palmer-hall-bw-320.webp 320w,
  //         /images/manley-palmer-hall-bw-768.webp 768w,
  //         /images/manley-palmer-hall-bw-1000.webp 1000w`
  // webp.sizes = '100vw'
  //
  // const jpg = document.createElement('source')
  // jpg.srcset = `/images/manley-palmer-hall-bw-320.jpg 320w,
  //         /images/manley-palmer-hall-bw-768.jpg 768w,
  //         /images/manley-palmer-hall-bw-1000.jpg 1000w`
  // jpg.sizes = '100vw'
  //
  // picture.appendChild(webp)
  // picture.appendChild(jpg)
  picture.appendChild(img)

  document.body.insertBefore(picture, document.body.firstChild)

  // var tmpImg = new window.Image()
  // tmpImg.onload = onImageLoaded
  // tmpImg.src = img.src

  return img.id
}

export default createKaleidoscopeImageElement
