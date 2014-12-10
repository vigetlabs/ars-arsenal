/**
 * Selection
 */

var Button = require('./ui/button')
var React  = require('react')

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
          { hasPhoto ? 'Pick another image' : 'Select an image' }
        </span>
      </Button>
    )
  }

})

module.exports = Selection
