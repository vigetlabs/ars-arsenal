/**
 * MultiSelectionItem
 * @flow
 */

import React from 'react'
import cx from 'classnames'
import Image from './ui/image'
import LoadRecord from '../containers/load-record'

type Props = {
  slug: ?string,
  url: string
}

export default class MultiSelectionItem extends React.Component<Props> {
  getPhoto(photo) {
    if (!photo) {
      return null
    }

    return (
      <Image className="ars-selection-photo" alt={photo.name} src={photo.url} />
    )
  }

  renderContent({ data, fetching }) {
    let className = cx('ars-multiselection-cell', {
      'ars-is-loading': fetching,
      'ars-has-photo': data
    })

    return <div className={className}>{this.getPhoto(data)}</div>
  }

  render() {
    return (
      <LoadRecord url={this.props.url} slug={this.props.slug}>
        {data => this.renderContent(data)}
      </LoadRecord>
    )
  }
}
