/**
 * Search
 */

import React    from 'react'
import UniqueID from '../mixins/uniqueId'

let Types = React.PropTypes

// The minimum number of characters before searching
const THRESHOLD = 2

let Search = React.createClass({

  mixins: [ UniqueID ],

  propTypes: {
    onChange : Types.func.isRequired
  },

  render() {
    let id = "ars_search_" + this.state.id

    return (
      <div className="ars-search">
        <label className="ars-search-label" htmlFor={ id }>Search</label>
        <input id={ id } ref="input" type="search" className="ars-search-input" onChange={ this._onChange } placeholder="Search" />
      </div>
    )
  },

  _onChange(e) {
    let query  = this.refs.input.getDOMNode().value || ''
    let result = query.length >= THRESHOLD ? query : ''

    this.props.onChange(result)
  }

})

module.exports = Search
