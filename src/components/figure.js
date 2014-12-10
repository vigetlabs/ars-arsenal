/**
 * Figure
 * An individual gallery tile
 */

var Image = require('./ui/image')
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
      <button className={ className } onClick={ this._onClick }>
        <Image className="ars-fig-img" src={ record.url } />

        <span className="ars-fig-caption">
          { record.caption }
        </span>
      </button>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(this.props.record.id)
  }

})

module.exports = Figure
