/* eslint-env serviceworker */

// WARNING: This is a service worker for the dev environment.
// Doesn't actually do anything. Just required for testing
// push notifications during development.
//
// This file will be overwritten when we build for production.

var host = self.location.hostname
var isLocalHost =
  (host.indexOf('localhost') > -1) ||
  (host.indexOf('127.0.0.1') > -1)
if (!isLocalHost) {
  var errorMessage = 'The current service worker is intended for a dev environment and should have been overwritten when building for production.'
  throw new Error(errorMessage)
}
