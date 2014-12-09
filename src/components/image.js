/**
 * Image
 * An individual gallery tile
 */

var React = require('react/addons')
var Thief = require('color-thief')

var Image = React.createClass({

  render() {
    return (
      <img { ...this.props } onLoad={ this._onLoad } />
    )
  },

  _onLoad() {
    var colorThief = new Thief();
    console.log(colorThief.getPalette(this.getDOMNode(), 8))
  }

})

module.exports = Image
