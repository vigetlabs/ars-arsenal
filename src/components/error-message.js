/**
 * ErrorMessage
 * Displays error information should an endpoint fail to respond
 * @flow
 */

import React from 'react'

type Props = {
  error: ?(Error | string)
}

export default class ErrorMessage extends React.Component<Props> {
  static defaultProps = {
    error: null
  }

  render() {
    let { error } = this.props

    if (!error) {
      return null
    }

    return (
      <div className="ars-error">
        {error instanceof Error ? error.message : error}
      </div>
    )
  }
}
