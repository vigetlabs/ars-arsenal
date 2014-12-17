/**
 * Search
 */

var React    = require('react')
var Types    = React.PropTypes
var UniqueID = require('../mixins/uniqueId')

// The minimum number of characters before searching
var THRESHOLD = 2

var Search = React.createClass({

  mixins: [ UniqueID ],

  propTypes: {
    onChange : Types.func.isRequired
  },

  render() {
    var id = "ars_search_" + this.state.id

    return (
      <div className="ars-search">
        <label className="ars-search-label" htmlFor={ id }>Search</label>
        <input id={ id } ref="input" type="search" className="ars-search-input" onChange={ this._onChange } placeholder="Search" />
      </div>
    )
  },

  _onChange(e) {
    var query  = this.refs.input.getDOMNode().value || ''
    var result = query.length >= THRESHOLD ? query : ''

    this.props.onChange(result)
  }

})

module.exports = Search
