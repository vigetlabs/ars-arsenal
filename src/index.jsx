/**
 * Ars Arsenal
 * A gallery picker
 */

import Ars   from './components/ars'
import React from 'react'

export default {
  component : Ars,

  render(el, options) {
    let component = React.createElement(Ars, options)

    React.render(component, el)

    return component
  }
}
