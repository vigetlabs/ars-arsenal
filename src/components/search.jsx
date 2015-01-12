/**
 * Search
 */

import debounce from 'debounce'
import React    from 'react'
import Button   from './ui/button'
import UniqueID from '../mixins/uniqueId'
import DataList from './datalist'

let Types = React.PropTypes

let Search = React.createClass({

  mixins: [ UniqueID ],

  statics: {
    // The minimum number of characters before searching
    THRESHOLD: 2,
    // The minimum time between change events
    INTERVAL: 150
  },

  propTypes: {
    onChange : Types.func.isRequired
  },

  getDefaultProps() {
    return {
      datalist: []
    }
  },

  getInitialState() {
    return {
      search : '',
      debouncedChange: debounce(this.props.onChange, Search.INTERVAL)
    }
  },

  render() {
    let id   = "ars_search_" + this.state.id
    let list = "ars_search_list" + this.state.id

    return (
      <form className="ars-search" onSubmit={ this._onSubmit }>
        <label className="ars-search-label" htmlFor={ id }>Search</label>
        <input id={ id } list={ list } ref="input" type="search" className="ars-search-input" onChange={ this._onChange } placeholder="Search" onKeyUp={ this._onKeyUp } value={ this.state.search } />
        <DataList id={ list} items={ this.props.datalist } />
        <Button className="ars-hidden">Submit</Button>
      </form>
    )
  },

  _updateSearch(search) {
    let result = search.length >= Search.THRESHOLD ? search : ''

    this.setState({ search }, () => this.state.debouncedChange(result))
  },

  _onChange(e) {
    this._updateSearch(this.refs.input.getDOMNode().value || '')
  },

  _onSubmit(e) {
    e.preventDefault()
    this._onChange()
  },

  _onKeyUp(event) {
    switch (event.key) {
      case 'Escape':
        event.stopPropagation()
        break;
    }
  }

})

module.exports = Search
