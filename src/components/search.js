/**
 * Search
 */

var DataList = require('./datalist')
var React    = require('react')
var Types    = React.PropTypes
var _id      = 0

var Search = React.createClass({

  propTypes: {
    datalist  : Types.array,
    onChange  : Types.func.isRequired,
    threshold : Types.number
  },

  getDefaultProps() {
    return {
      threshold: 2
    }
  },

  getInitialState() {
    return {
      id: _id++
    }
  },

  render() {
    var inputId = "__search_" + this.state.id
    var listId  = "__list_" + this.state.id

    return (
      <div className="ars-search">
        <label className="ars-search-label" htmlFor={ inputId }>Search</label>

        <input ref="input" type="search" className="ars-search-input" onKeyUp={ this._onKeyUp } list={ listId } />

        <DataList id={ listId } items={ this.props.datalist } />
      </div>
    )
  },

  _onKeyUp(e) {
    var query = this.refs.input.getDOMNode().value

    if (query.length >= this.props.threshold) {
      this.props.onChange(query)
    }
  }

})

module.exports = Search
