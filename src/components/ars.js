/**
 * Ars
 * The main element for Ars Arsenal
 */

var React   = require('react/addons')
var Gallery = require('./gallery')

var Ars = React.createClass({

  render() {
    var { src } = this.props

    return (
      <div className="ars">
        <Gallery />
      </div>
    )
  }

})

module.exports = Ars
