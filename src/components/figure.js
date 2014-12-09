/**
 * Figure
 * An individual gallery tile
 */

var React = require('react')

var Figure = React.createClass({

  render() {
    var { src } = this.props

    return (
      <figure className="ars-fig">
        <img className="ars-fig-img" src={ src } />
      </figure>
    )
  }

})

module.exports = Figure
