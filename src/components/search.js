/**
 * Search
 */

var React = require('react')
var Types = React.PropTypes
var _id   = 0

var Search = React.createClass({

  propTypes: {
    onChange   : Types.func.isRequired,
    datalist : Types.array
  },

  getDefaultProps() {
    return {
      datalist: []
    }
  },

  getInitialState() {
    return {
      id: _id++
    }
  },

  getOption(option, i) {
    return <option key={ "option_" + i } value={ option } />
  },

  render() {
    var inputId = "__search_" + this.state.id
    var listId  = "__list_" + this.state.id

    return (
      <div className="ars-search">
        <label className="ars-search-label" htmlFor={ inputId }>Search</label>

        <input ref="input" type="search" className="ars-search-input" onKeyUp={ this._onKeyUp } list={ listId } />

        <datalist id={ listId }>
          { this.props.datalist.map(this.getOption)}
        </datalist>
      </div>
    )
  },

  _onKeyUp(e) {
    this.props.onChange(this.refs.input.getDOMNode().value)
  }

})

module.exports = Search
