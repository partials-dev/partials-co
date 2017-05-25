const detectModality = () => {
  let confirmOrientationSupport
  const supportsOrientation = new Promise((resolve, reject) => {
    if ('DeviceOrientationEvent' in window) {
      // only resolve when we actually see a device orientation event
      confirmOrientationSupport = event => {
        const supported = event.alpha != null && event.beta != null && event.gamma != null
        if (supported) {
          resolve('orientation')
        }
      }
      window.addEventListener('deviceorientation', confirmOrientationSupport)
    }
  })

  let confirmMouseSupport
  const supportsMouse = new Promise((resolve, reject) => {
    if ('MouseEvent' in window) {
      confirmMouseSupport = event => {
        resolve('mouse')
      }
      window.addEventListener('mousemove', confirmMouseSupport)
    }
  })

  return Promise.race([supportsOrientation, supportsMouse]).then(modality => {
    window.removeEventListener('mousemove', confirmMouseSupport)
    window.removeEventListener('orientation', confirmOrientationSupport)
    return modality
  })
}

export default detectModality
