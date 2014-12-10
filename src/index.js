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


var React = require('react')
var Ars   = require('./components/ars')

module.exports = function(el, options) {
  React.render(<Ars { ...options } />, el)
}
