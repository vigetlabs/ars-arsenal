/**
 * Error
 * Displays error information should an endpoint fail to respond
 * @flow
 */

import React from 'react'

type Props = {
  error: false | string
}

export default class Error extends React.Component<Props> {
  static defaultProps = {
    error: false
  }

  render() {
    if (!this.props.error) {
      return null
    }

    return <div className="ars-error">{`${this.props.error}`}</div>
  }
}
