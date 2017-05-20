/* eslint-env jest */

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'
import ampHtmlValidator from 'amphtml-validator'
import fs from 'fs'
import path from 'path'

it('is valid AMP html', done => {
  const renderedApp = ReactDOMServer.renderToStaticMarkup(<App />)
  const indexPath = path.join(__dirname, '../public/index.html')
  const index = fs.readFileSync(indexPath, 'utf8')
  const markup = index.replace('<!-- {app} -->', renderedApp)
  validate(markup).then(result => {
    expect(result.status).toEqual('PASS')
    done()
  })
})

function validate (markup) {
  return ampHtmlValidator.getInstance().then(validator => {
    const result = validator.validateString(markup)
    if (result.status === 'PASS') {
      console.log(result.status)
    } else {
      console.error(result.status)
    }
    for (let i = 0; i < result.errors.length; i++) {
      var error = result.errors[i]
      var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message
      if (error.specUrl !== null) {
        msg += ' (see ' + error.specUrl + ')'
      }
      if (error.severity === 'ERROR') {
        console.error(msg)
      } else {
        console.warn(msg)
      }
    }
    return result
  })
}
