/**
 * Ars Arsenal
 * A gallery picker
 */

import 'style/ars-arsenal'

import Ars   from './components/ars'
import React from 'react'


module.exports = {
  component : Ars,

  render(el, options) {
    let component = React.createElement(Ars, options)

    React.render(component, el)

    return component
  }
}
