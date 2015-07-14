/**
 * MultiSelection
 */

let Button             = require('./ui/button')
let MultiSelectionItem = require('./multiselection-item')
let React              = require('react')
let Types              = React.PropTypes
let cx                 = require('classnames')

let MultiSelection = React.createClass({

  propTypes: {
    slug: Types.array.isRequired
  },

  getItems() {
    let { slug, url } = this.props
    if (slug.length > 0) {
      return (
        <div className="ars-multiselection-grid">
          { slug.map( (s, i) => (<MultiSelectionItem key={ i } slug={ s } url={ url } />) ) }
        </div>
      )
    }
  },

  render() {
    return (
      <div className="ars-multiselection">
        { this.getItems() }

        <Button ref="button" onClick={ this._onClick } className="ars-selection-edit">
          { this.props.slug.length > 0 ? 'Pick different photos' : 'Pick photos' }
        </Button>
      </div>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(e)
  }

})

module.exports = MultiSelection
