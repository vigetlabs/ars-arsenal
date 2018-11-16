/**
 * Selection
 */

import * as React from 'react'
import cx from 'classnames'
import Button from './ui/button'
import SelectionFigure from './selection-figure'
import SelectionText from './selection-text'
import LoadRecord, { RecordResult } from '../containers/load-record'
import { Record, ID } from '../record'

interface Props {
  resource: string
  id: ID | null
  onClick: (event: React.SyntheticEvent) => void
}

export default class Selection extends React.Component<Props, {}> {
  getPhoto(data: Record | null) {
    let showPhoto = data != null && this.props.id
    return showPhoto ? <SelectionFigure item={data} /> : null
  }

  renderContent({ data, fetching }: RecordResult) {
    let { resource, onClick } = this.props

    let className = cx('ars-selection', {
      'ars-is-loading': fetching,
      'ars-has-photo': data
    })

    return (
      <div className={className}>
        <div className="ars-selection-inner">
          {this.getPhoto(data)}

          <Button onClick={onClick} className="ars-selection-edit">
            <SelectionText
              item={!!data}
              fetching={fetching}
              resource={resource}
            />

            <span className="ars-selection-button-icon" aria-hidden="true" />
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <LoadRecord
        id={this.props.id}
        render={this.renderContent.bind(this)}
      />
    )
  }
}
