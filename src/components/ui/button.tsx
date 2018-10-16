/**
 * Button
 */

import * as React from 'react'
import Ink from 'react-ink'
import cx from 'classnames'

interface Props {
  className: string
  raised?: boolean
  onClick: (event: React.SyntheticEvent) => void
  disabled?: boolean
}

const Button: React.SFC<Props> = ({ children, raised, ...attrs }) => {
  let className = cx(attrs.className, 'ars-button', {
    'ars-button-raised': raised
  })

  return (
    <button type="button" {...attrs} className={className}>
      {children}
      <Ink />
    </button>
  )
}

export default Button
