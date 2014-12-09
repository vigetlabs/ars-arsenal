/**
 * Datalist
 * Populates a datalist for an input
 */

var React = require('react')
var Types = React.PropTypes

var Search = React.createClass({

  propTypes: {
    id    : Types.string.isRequired,
    items : Types.array
  },

  getDefaultProps() {
    return {
      items: []
    }
  },

  getOption(option, i) {
    return <option key={ "option_" + i } value={ option } />
  },

  render() {
    return (
      <datalist id={ this.props.id }>
        { this.props.items.map(this.getOption)}
      </datalist>
    )
  }

})

module.exports = Search
