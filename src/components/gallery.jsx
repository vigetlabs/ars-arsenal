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
      <Figure key={ 'photo_' + record.id } picked={ isPicked } record={ record } onClick={ this.props.onPicked } />
    )
  },

  getEmpty() {
    let search = this.props.search
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
      <div>
        { this.getEmpty() }
        <Animation component="div" className="ars-gallery" transitionName="ars-fig" onKeyDown={ this.props.onKeyDown }>
          { items.map(this.getItem) }
        </Animation>
     </div>
    )
  }

})

export default Gallery
