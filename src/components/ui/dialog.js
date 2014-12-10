/**
 * Dialog
 * A reuseable modal
 */

var React = require('react')
var Types = React.PropTypes
var Focus = require('../../mixins/focus')

var Dialog = React.createClass({

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
