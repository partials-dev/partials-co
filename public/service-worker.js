/* eslint-env serviceworker */
self.importScripts('/sw-toolbox/sw-toolbox.js')

const precacheResources = [
  // '/images/manley-palmer-hall-bw-1000.webp',
  // '/images/manley-palmer-hall-bw-1000-placeholder.webp',
  '/static/js/bundle.js',
  'favicon.ico'
]

const toolbox = self.toolbox

toolbox.options.debug = true
toolbox.precache(precacheResources)
toolbox.router.default = toolbox.fastest

self.addEventListener('install', function () {
  self.skipWaiting()
})
