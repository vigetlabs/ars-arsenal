/**
 * Figure
 * An individual gallery tile
 */

var React = require('react')
var Types = React.PropTypes

var Figure = React.createClass({

  propTypes: {
    record  : Types.object.isRequired,
    onClick : Types.func.isRequired,
    picked  : Types.bool
  },

  render() {
    var { record, picked } = this.props

    var className = `ars-fig ${ picked ? 'ars-fig-picked' : '' }`

    return (
      <figure className={ className } onClick={ this._onClick }>
        <img className="ars-fig-img" src={ record.url } />

        <figcaption className="ars-fig-caption">
          { record.caption }
        </figcaption>
      </figure>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(this.props.record.id)
  }

})

module.exports = Figure
