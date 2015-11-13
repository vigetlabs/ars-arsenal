/**
 * Ars Arsenal
 * A gallery picker
 */

let Ars   = require('./components/ars')
let React = require('react')
let DOM   = require('react-dom')

let ArsArsenal = {
  component: Ars,
  render(el, options) {
    let component = React.createElement(Ars, options)

    DOM.render(component, el)

    return component
  }
}

module.exports = ArsArsenal
