/**
 * Button
 */

var React = require('react/addons')
var Types = React.PropTypes
var cx    = React.addons.classSet

var Button = React.createClass({

  render() {
    var { className, children, ...attrs} = this.props

    return (
      <button className={ cx('ars-button', className) } { ...attrs }>
        { children }
      </button>
    )
  }

})

module.exports = Button
