/**
 * MultiSelectionItem
 * @flow
 */

import React from 'react'
import cx from 'classnames'
import Image from './ui/image'
import LoadRecord from '../containers/load-record'
import { type ID, type Record } from '../record'

type Props = {
  slug: ?ID
}

export default class MultiSelectionItem extends React.Component<Props> {
  getPhoto(photo: ?Record) {
    if (!photo) {
      return null
    }

    return (
      <Image className="ars-selection-photo" alt={photo.name} src={photo.url} />
    )
  }

  renderContent({ data, fetching }: *) {
    let className = cx('ars-multiselection-cell', {
      'ars-is-loading': fetching,
      'ars-has-photo': data
    })

    return <div className={className}>{this.getPhoto(data)}</div>
  }

  render() {
    return (
      <LoadRecord {...this.props}>
        {result => this.renderContent(result)}
      </LoadRecord>
    )
  }
}
