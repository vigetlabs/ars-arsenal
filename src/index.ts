/**
 * Ars Arsenal
 * A gallery picker
 */

import * as React from 'react'
import * as DOM from 'react-dom'
import Ars from './components/ars'
import { ArsOptions } from './options'

const ArsArsenal = {
  component: Ars,
  render(el: HTMLElement, options: ArsOptions) {
    let component = React.createElement(Ars, options)

    DOM.render(component, el)

    return component
  }
}

// Exported as CommonJS for better interop
module.exports = ArsArsenal
