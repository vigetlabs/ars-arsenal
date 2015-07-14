/**
 * Ars Arsenal
 * A gallery picker
 */

let Ars   = require('./components/ars')
let React = require('react')

let ArsArsenal = React.createClass({
  render() {
    return (<Ars { ...this.props } />)
  }
})

ArsArsenal.component = Ars

ArsArsenal.render = function (el, options) {
  let component = React.createElement(Ars, options)
  React.render(component, el)
  return component
}

module.exports = ArsArsenal
