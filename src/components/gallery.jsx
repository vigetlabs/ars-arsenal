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
      picked : false
    }
  },

  getItem(record) {
    let isPicked = record.id === this.props.picked

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

export default Gallery
