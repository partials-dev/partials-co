module.exports = {
  globDirectory: './build/',
  globPatterns: ['**/*.{html,css,png,jpg,gif,svg,eot,ttf,woff,json}'],
  swDest: 'build/service-worker.js',
  clientsClaim: true,
  skipWaiting: true
}
