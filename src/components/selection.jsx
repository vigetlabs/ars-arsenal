/**
 * Selection
 */

let Button          = require('./ui/button')
let SelectionFigure = require('./selection-figure')
let React           = require('react')
let Record          = require('../mixins/record')
let cx              = require('classnames')

let Selection = React.createClass({

  mixins: [ Record ],

  getPhoto() {
    let { item } = this.state
    return item ? (<SelectionFigure ref="photo" item={ item } />) : null
  },

  render() {
    let className = cx('ars-selection', {
      'ars-is-loading': this.state.fetching,
      'ars-has-photo' : this.state.item
    })

    return (
      <div className={ className }>
        <div className="ars-selection-inner">
          { this.getPhoto() }

          <Button ref="button" onClick={ this._onClick } className="ars-selection-edit">
            { this.state.item ? 'Pick a different photo' : 'Pick a photo' }
          </Button>
        </div>
      </div>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(e)
  }

})

module.exports = Selection
