import awaitServiceWorkerRegistration from './awaitServiceWorkerRegistration'
import urlBase64ToUint8Array from './urlBase64ToUint8Array'

const isSupported =
  ('serviceWorker' in navigator) &&
  ('PushManager' in window)

function requestPermission () {
  return new Promise((resolve, reject) => {
    const permissionResult = window.Notification.requestPermission(result => {
      resolve(result)
    })
    if (permissionResult) {
      permissionResult.then(resolve, reject)
    }
  })
  .then(permissionResult => {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.')
    }
    return permissionResult
  })
}

function subscribe (serviceWorkerRegistration) {
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY)
  }
  return serviceWorkerRegistration.pushManager.subscribe(subscribeOptions)
}

const localSubscriptionId = {
  set (id) {
    window.localStorage.setItem('pushSubscriptionId', id)
  },
  get () {
    return window.localStorage.getItem('pushSubscriptionId')
  },
  remove () {
    return window.localStorage.removeItem('pushSubscriptionId')
  }
}

function saveSubscription (subscription) {
  const endpoint = process.env.REACT_APP_FIREBASE_ENDPOINT + '/PushSubscriptions.json'
  return window.fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  }).then(response => {
    if (!response.ok) {
      throw new Error('Bad status code from server.')
    }

    return response.json()
  }).then(responseData => {
    if (!responseData.name) {
      throw new Error('Bad response from server.')
    }
    localSubscriptionId.set(responseData.name)
  })
}

function deleteSubscription () {
  const id = localSubscriptionId.get()
  const endpoint = process.env.REACT_APP_FIREBASE_ENDPOINT + `/PushSubscriptions/${id}.json`
  return window.fetch(endpoint, {
    method: 'DELETE'
  }).then(response => {
    if (!response.ok) {
      throw new Error('Bad status code from server.')
    }

    return response.json()
  }).then(responseData => {
    if (responseData !== null) {
      throw new Error('Bad response from server.')
    }
    localSubscriptionId.remove()
  })
}

function enablePushNotifications () {
  return requestPermission()
    .then(awaitServiceWorkerRegistration)
    .then(subscribe)
    .then(saveSubscription)
}

function disablePushNotifications () {
  return deleteSubscription()
}

function setEnabled (enabled) {
  if (enabled) {
    return enablePushNotifications()
  } else {
    return disablePushNotifications()
  }
}

const permissionGranted = () => window.Notification && window.Notification.permission === 'granted'
const permissionDenied = () => window.Notification && window.Notification.permission === 'denied'
const isEnabled = () => permissionGranted() && localSubscriptionId.get()

const push = {
  isSupported,
  isEnabled,
  setEnabled,
  permissionGranted,
  permissionDenied
}

export default push
