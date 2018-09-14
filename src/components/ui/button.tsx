/**
 * Button
 */

import * as React from 'react'
import Ink from 'react-ink'
import cx from 'classnames'

interface Props {
  className: string
  raised: boolean
  type: 'button' | 'submit'
  onClick: (event: React.SyntheticEvent) => void,
  disabled?: boolean
}

export default class Button extends React.Component<Props, {}> {
  static defaultProps = {
    className: '',
    raised: false,
    type: 'button'
  }

  getClassName(base: string) {
    let { raised } = this.props

    let mods = cx('ars-button', {
      'ars-button-raised': raised
    })

    return cx(base, mods)
  }

  render() {
    let { className, children, raised: _raised, ...attrs } = this.props

    return (
      <button className={this.getClassName(className)} {...attrs}>
        {children}
        <Ink />
      </button>
    )
  }
}
