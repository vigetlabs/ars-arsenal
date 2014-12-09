/**
 * Ars Arsenal
 * A gallery picker
 */

/**
 * All necessary polyfills
 */
require('./patch')

/**
 * Style information compiled via Webpack
 */
require('style/ars-arsenal')

var React   = require('react')
var Gallery = require('./components/gallery')

module.exports = function(selector) {
  var el = document.querySelector(selector)

  React.render(<Gallery />, el)
}
