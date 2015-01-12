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
    if (!this.props.error) return null

    return <div className="ars-error">{ this.props.error.toString() }</div>
  }

})

module.exports = Error
