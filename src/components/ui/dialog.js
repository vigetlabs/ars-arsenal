/**
 * Dialog
 * A reuseable modal
 */

import Focus from '../../mixins/focus'
import React from 'react'

let Types = React.PropTypes

let Dialog = React.createClass({

  mixins: [ Focus ],

  propTypes: {
    onExit : Types.func.isRequired,
  },

  render() {
    return (
      <div className="ars-dialog" tabIndex="0" role="dialog" onKeyUp={ this._onKeyUp }>

        <div className="ars-dialog-blackout" aria-hidden={ true } onClick={ this.props.onExit }/>

        <section className="ars-dialog-inner">
          { this.props.children }
        </section>

      </div>
    )
  },

  _onKeyUp(e) {
    if (e.key === 'Escape') {
      this.props.onExit()
    }
  }

})

module.exports = Dialog
