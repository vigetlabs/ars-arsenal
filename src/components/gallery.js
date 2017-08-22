/**
 * Gallery
 * Displays tiles of photos
 */

import React from 'react'
import Animation from 'react-addons-css-transition-group'
import Figure from './figure'
import createClass from 'create-react-class'
import cx from 'classnames'
import { func, array } from 'prop-types'

let Gallery = createClass({
  propTypes: {
    items: array,
    onPicked: func.isRequired
  },

  getDefaultProps() {
    return {
      items: [],
      picked: false,
      search: false
    }
  },

  componentDidMount() {
    this.mounted = true
  },

  getItem(record, index) {
    let isPicked = this.props.picked
      ? this.props.picked.indexOf(record.id) !== -1
      : false

    let className = cx('ars-gallery-item', {
      'ars-gallery-animate': !this.mounted
    })

    let animationDelay = 150 + index * 60 + 'ms'

    return (
      <div className={className} key={record.id} style={{ animationDelay }}>
        <Figure
          picked={isPicked}
          record={record}
          onClick={this.props.onPicked}
        />
      </div>
    )
  },

  render() {
    let items = this.props.items

    return (
      <Animation
        component="div"
        className="ars-gallery"
        transitionName="ars-figure"
        onKeyDown={this.props.onKeyDown}
        transitionEnterTimeout={480}
        transitionLeaveTimeout={480}
      >
        {items.map(this.getItem)}
      </Animation>
    )
  }
})

export default Gallery
