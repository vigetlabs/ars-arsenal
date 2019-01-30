/**
 * MultiSelectionItem
 */

import * as React from 'react'
import cx from 'classnames'
import Image from './ui/image'
import SelectionNotFound from './ui/selection-not-found'
import LoadRecord, { RecordResult } from '../containers/load-record'
import { RefreshIcon } from '../icons'
import { ID, Record } from '../record'

interface Props {
  id: ID | null
  resource: string
}

export default class MultiSelectionItem extends React.Component<Props> {
  getPhoto(photo: Record | null) {
    return photo ? (
      <Image className="ars-selection-photo" alt={photo.name} src={photo.url} />
    ) : null
  }

  renderContent({ data, fetching, initialized }: RecordResult) {
    if (initialized && !fetching && data == null) {
      return <SelectionNotFound resource={this.props.resource} />
    }

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
