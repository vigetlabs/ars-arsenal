/**
 * Datalist
 */

let React = require('react')
let Types = React.PropTypes

let DataList = React.createClass({

  propTypes: {
    id    : Types.string.isRequired,
    items : Types.array
  },

  getDefaultProps() {
    return {
      items: []
    }
  },

  getOption(record) {
    return (<option key={ record.id }>{ record.caption }</option>)
  },

  render() {
    let { items, id } = this.props

    return (
      <datalist id={ id }>
        { items.map(this.getOption) }
      </datalist>
    )
  }

})

  module.exports = DataList
