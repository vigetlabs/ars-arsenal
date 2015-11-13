/**
 * Gallery
 * Displays tiles of photos
 */

let Animation = require('react-addons-css-transition-group')
let React     = require('react')
let Figure    = require('./figure')

let Gallery = React.createClass({

  propTypes: {
    items    : React.PropTypes.array,
    onPicked : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      items  : [],
      picked : false,
      search : false
    }
  },

  getItem(record) {
    let isPicked = this.props.picked ? this.props.picked.indexOf(record.id) !== -1 : false

    return (
      <div className="ars-gallery-item" key={ 'photo_' + record.id } >
        <Figure picked={ isPicked } record={ record } onClick={ this.props.onPicked } />
      </div>
    )
  },

  getEmpty() {
    let search  = this.props.search
    let isEmpty = this.props.items.length <= 0

    return isEmpty ? (
      <p key="__empty" className="ars-empty">
        No items exist { search? `for “${ search }”` : ''}
      </p>
    ) : null
  },

  render() {
    let items = this.props.items

    return (
      <Animation component="div" className="ars-gallery" transitionName="ars-figure" onKeyDown={ this.props.onKeyDown } transitionEnterTimeout={ 480 } transitionLeaveTimeout={ 480 }>
        { this.getEmpty() }
        { items.map(this.getItem) }
      </Animation>
    )
  }

})

module.exports = Gallery
