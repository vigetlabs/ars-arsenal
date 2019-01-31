/**
 * Button
 */

import * as React from 'react'
import Ink from 'react-ink'
import cx from 'classnames'

interface Props extends React.HTMLProps<HTMLButtonElement> {
  raised?: boolean
  onClick: (event: React.SyntheticEvent) => void
}

const Button: React.SFC<Props> = ({ children, raised, hidden, ...attrs }) => {
  let className = cx(attrs.className, 'ars-button', {
    'ars-button-raised': raised
  })

  if (hidden) {
    return null
  }

  return (
    <button type="button" {...attrs} className={className}>
      {children}
      <Ink />
    </button>
  )
}

export default Button
