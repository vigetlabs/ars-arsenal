/**
 * Button
 */

import Ink from 'react-ink'
import React from 'react'
import cx from 'classnames'
import createClass from 'create-react-class'

let Button = createClass({
  getDefaultProps() {
    return {
      raised: false,
      type: 'button'
    }
  },

  getClassName(base) {
    let mods = cx('ars-button', {
      'ars-button-raised': this.props.raised
    })

    return cx(base, mods)
  },

  render() {
    let { className, children, ...attrs } = this.props

    // Don't let raised fall through
    delete attrs.raised

    return (
      <button className={this.getClassName(className)} {...attrs}>
        {children}
        <Ink />
      </button>
    )
  }
})

export default Button
