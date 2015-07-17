/**
 * Ars Arsenal
 * A gallery picker
 */

let Ars   = require('./components/ars')
let React = require('react')

let ArsArsenal = {
  component: Ars,
  render: function (el, options) {
    let component = React.createElement(Ars, options)
    React.render(component, el)
    return component
  }
}

module.exports = ArsArsenal
