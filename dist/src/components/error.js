/**
 * Error
 * Displays error information should an endpoint fail to respond
 */

var React = require("react");

var Error = React.createClass({
  displayName: "Error",

  getDefaultProps: function getDefaultProps() {
    return {
      error: false
    };
  },

  render: function render() {
    if (!this.props.error) return null;

    return React.createElement(
      "div",
      { className: "ars-error" },
      this.props.error.toString()
    );
  }

});

module.exports = Error;