/**
 * Error
 * Displays error information should an endpoint fail to respond
 */

import React from 'react'
import createClass from 'create-react-class'

let Error = createClass({
  getDefaultProps() {
    return {
      error: false
    }
  },

  render() {
    if (!this.props.error) {
      return null
    }

    return (
      <div className="ars-error">
        {`${this.props.error}`}
      </div>
    )
  }
})

export default Error
