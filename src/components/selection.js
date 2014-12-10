/**
 * Selection
 */

var Button = require('./ui/button')
var React  = require('react')

var SHOULD_SELECT = 'Select an image'
var PICK_ANOTHER  = 'Choose another image'

var Selection = React.createClass({

  getPhoto() {
    var { caption, url } = this.props.photo

    return (
      <img className="ars-selection-photo" alt={ caption } src={ url } />
    )
  },

  render() {
    var hasPhoto = this.props.photo

    return (
      <Button className="ars-selection" onClick={ this.props.onClick }>
        { hasPhoto && this.getPhoto() }

        <span className="ars-selection-caption">
          { hasPhoto ? PICK_ANOTHER : SHOULD_SELECT }
        </span>
      </Button>
    )
  }

})

module.exports = Selection
