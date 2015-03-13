/**
 * Gallery
 * Displays tiles of photos
 */

import React  from 'react/addons'
import Figure from './figure'

let Animation = React.addons.CSSTransitionGroup
var Types     = React.PropTypes

let Gallery = React.createClass({

  propTypes: {
    items    : Types.array,
    onPicked : Types.func.isRequired
  },

  getDefaultProps() {
    return {
      items  : [],
      picked : false,
      search : false
    }
  },

  getItem(record) {
    let isPicked = record.id === this.props.picked

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
      <Animation component="div" className="ars-gallery" transitionName="ars-fade" onKeyDown={ this.props.onKeyDown }>
        { this.getEmpty() }
        { items.map(this.getItem) }
      </Animation>
    )
  }

})

export default Gallery
