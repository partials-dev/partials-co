const pkg = require('./package.json')
const swPrecache = require('sw-precache')
const path = require('path')
const fs = require('fs')

const root = 'build'

const options = {
  cacheId: pkg.name,
  root: 'build',
  staticFileGlobs: [root + '/pixi.min.s', root + '/**/*.{html,css,png,jpg,gif,svg,eot,ttf,woff,json}', root + '/static/**/*.js'],
  stripPrefix: root,
  navigateFallback: '/200',
  verbose: true
}

console.log('')
console.log('👷🏻  Precaching service worker')
console.log('')

const serviceWorkerPath = path.join(root, 'service-worker.js')
swPrecache.generate(options).then(serviceWorkerString => {
  // remove .html suffixes; necessary for Firebase's cleanUrls option to work.
  const cleaned = serviceWorkerString.replace(/\.html/g, '')
  fs.writeFileSync(serviceWorkerPath, cleaned)
})
