/**
 * MultiSelectionItem
 */

let Button          = require('./ui/button')
let SelectionFigure = require('./selection-figure')
let Image           = require("./ui/image")
let React           = require('react')
let Record          = require('../mixins/record')
let cx              = require('classnames')

let MultiSelectionItem = React.createClass({

  mixins: [ Record ],

  getPhoto() {
    let { name, url } = this.state.item

    if (url) {
      return (
        <Image ref="photo" className="ars-selection-photo" alt={ name } src={ url } />
      )
    }
  },

  render() {
    let className = cx('ars-multiselection-cell', {
      'ars-is-loading': this.state.fetching,
      'ars-has-photo' : this.state.item
    })

    return (
      <div className={ className }>
        { this.getPhoto() }
      </div>
    )
  }

})

module.exports = MultiSelectionItem
