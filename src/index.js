/**
 * Ars Arsenal
 * A gallery picker
 */

/**
 * All necessary polyfills
 */

import '6to5/runtime'
import './patch'


/**
 * Style information compiled via Webpack
 */

require('style/ars-arsenal')

import Ars   from './components/ars'
import React from 'react'

module.exports = {
  component : Ars,
  render    : function(el, options) {
    React.render(<Ars { ...options } />, el)
  }
}
