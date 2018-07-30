/**
 * Button
 * @flow
 */

import Ink from 'react-ink'
import React from 'react'
import cx from 'classnames'

type Props = {
  className: string,
  children: *,
  raised: boolean,
  type: 'button' | 'submit'
}

export default class Button extends React.Component<Props> {
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
