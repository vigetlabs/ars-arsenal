/**
 * Gallery
 * Displays tiles of photos
 */

var React     = require('react/addons')
var Animation = React.addons.CSSTransitionGroup
var Figure    = require('./figure')
var Types     = React.PropTypes

var Gallery = React.createClass({

  propTypes: {
    items    : Types.array,
    onPicked : Types.func.isRequired
  },

  getDefaultProps() {
    return {
      items  : [],
      picked : false
    }
  },

  getItem(record) {
    var isPicked = record.id === this.props.picked

    return (
      <Figure key={ 'photo_' + record.id } picked={ isPicked } record={ record } onClick={ this.props.onPicked } />
    )
  },

  render() {
    return (
      <Animation component="div" className="ars-gallery" transitionName="ars-fig" onKeyDown={ this.props.onKeyDown }>
        { this.props.items.map(this.getItem) }
      </Animation>
    )
  }

})

module.exports = Gallery
