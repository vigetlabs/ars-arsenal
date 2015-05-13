/**
 * Error
 * Displays error information should an endpoint fail to respond
 */

let React = require('react')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      error: false
    }
  },

  render() {
    if (!this.props.error) return null

    return (
      <div className="ars-error">
        { `${ this.props.error }` }
      </div>
    )
  }

})
