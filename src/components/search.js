/**
 * Search
 */

import debounce from 'debounce'
import React    from 'react'
import Button   from './ui/button'
import UniqueID from '../mixins/uniqueId'

let Types = React.PropTypes

// The minimum number of characters before searching
const THRESHOLD = 2

// The minimum time between change events
const INTERVAL  = 50

let Search = React.createClass({

  mixins: [ UniqueID ],

  propTypes: {
    onChange : Types.func.isRequired
  },

  getInitialState() {
    return {
      debouncedChange: debounce(this.props.onChange, INTERVAL)
    }
  },

  render() {
    let id = "ars_search_" + this.state.id

    return (
      <form className="ars-search" onSubmit={ this._onSubmit }>
        <label className="ars-search-label" htmlFor={ id }>Search</label>
        <input id={ id } ref="input" type="search" className="ars-search-input" onChange={ this._onChange } placeholder="Search" />
        <Button className="ars-hidden">Submit</Button>
      </form>
    )
  },

  _onChange(e) {
    let query  = this.refs.input.getDOMNode().value || ''
    let result = query.length >= THRESHOLD ? query : ''

    this.state.debouncedChange(result)
  },

  _onSubmit(e) {
    e.preventDefault()
    this._onChange()
  }

})

module.exports = Search
