/**
 * ErrorMessage
 * Displays error information should an endpoint fail to respond
 */

import * as React from 'react'

interface Props {
  error?: Error | string
}

const ErrorMessage: React.SFC<Props> = ({ error }) => {
  if (!error) {
    return null
  }

  return <div className="ars-error">{error instanceof Error ? error.message : error}</div>
}

export default ErrorMessage
