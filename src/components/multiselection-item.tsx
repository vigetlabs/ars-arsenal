/**
 * MultiSelectionItem
 */

import * as React from 'react'
import cx from 'classnames'
import Image from './ui/image'
import LoadRecord from '../containers/load-record'
import { RefreshIcon } from '../icons'
import { ID, Record } from '../record'

interface Props {
  id: ID | null
}

export default class MultiSelectionItem extends React.Component<Props> {
  getPhoto(photo: Record | null) {
    if (photo == null) {
      return null
    }

    return (
      <Image className="ars-selection-photo" alt={photo.name} src={photo.url} />
    )
  }

  renderContent({
    data,
    fetching
  }: {
    data: Record | null
    fetching: boolean
  }) {
    let className = cx('ars-multiselection-cell', {
      'ars-is-loading': fetching,
      'ars-has-photo': data
    })

    return (
      <div className={className}>
        {fetching ? <RefreshIcon /> : null}
        {this.getPhoto(data)}
      </div>
    )
  }

  render() {
    return (
      <LoadRecord id={this.props.id} render={this.renderContent.bind(this)} />
    )
  }
}
