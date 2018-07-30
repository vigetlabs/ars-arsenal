/**
 * MultiSelectionItem
 */

import Image from './ui/image'
import React from 'react'
import Record from '../mixins/record'
import cx from 'classnames'
import createClass from 'create-react-class'

let MultiSelectionItem = createClass({
  mixins: [Record],

  getPhoto() {
    let { name, url } = this.state.item

    if (url) {
      return (
        <Image
          ref="photo"
          className="ars-selection-photo"
          alt={name}
          src={url}
        />
      )
    }
  },

  render() {
    let className = cx('ars-multiselection-cell', {
      'ars-is-loading': this.state.fetching,
      'ars-has-photo': this.state.item
    })

    return <div className={className}>{this.getPhoto()}</div>
  }
})

export default MultiSelectionItem
