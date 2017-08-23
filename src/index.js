/**
 * Ars Arsenal
 * A gallery picker
 */

import Ars from './components/ars'
import React from 'react'
import DOM from 'react-dom'

let ArsArsenal = {
  component: Ars,
  render(el, options) {
    let component = React.createElement(Ars, options)

    DOM.render(component, el)

    return component
  }
}

// Exported as CommonJS for better interop
module.exports = ArsArsenal
