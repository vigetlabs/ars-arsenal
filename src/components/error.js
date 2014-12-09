/**
 * Error
 * Displays error information should an endpoint fail to respond
 */

var React = require('react/addons')

var Error = React.createClass({

  getDefaultProps() {
    return {
      error: false
    }
  },

  render() {
    var error = this.props.error

    if (!error) return null

    return (
      <div className="ars-error">
        { error.toString() }
      </div>
    )
  }

})

module.exports = Error
