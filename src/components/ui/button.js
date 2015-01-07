/**
 * Button
 */

import React from 'react/addons'

let cx = React.addons.classSet

let Button = React.createClass({

  getDefaultProps() {
    return {
      raised : false,
      type   : 'button'
    }
  },

  getClassName(base) {
    let mods = cx({
      'ars-button' : true,
      'ars-button-raised' : this.props.raised
    })

    return cx(base, mods)
  },

  render() {
    let { className, children, ...attrs} = this.props

    return (
      <button className={ this.getClassName(className) } { ...attrs }>
        { children }
      </button>
    )
  }

})

export default Button
