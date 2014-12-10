/**
 * Preview
 * The default state when a photo has been chosen
 */

var React = require('react/addons')
var Types = React.PropTypes

var Preview = React.createClass({

  render() {
    return (
      <img src={ this.props.record.src } />
    )
  }

})

module.exports = Preview
