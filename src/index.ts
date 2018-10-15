/**
 * Ars Arsenal
 * A gallery picker
 */

import * as React from 'react'
import * as DOM from 'react-dom'
import Ars from './components/ars'
import { ArsOptions } from './options'

/**
 * Render an ArsArsenal component for a given element.
 */
function render(el: HTMLElement, options: ArsOptions) {
  let component = React.createElement(Ars, options)

  DOM.render(component, el)

  return component
}

export { Ars, Ars as component, render }

export default { component: Ars, render }
