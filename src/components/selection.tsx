/**
 * Selection
 */

import * as React from 'react'
import cx from 'classnames'
import Button from './ui/button'
import SelectionFigure from './selection-figure'
import SelectionNotFound from './ui/selection-not-found'
import selectionText from './selection-text'
import { EditIcon, ClearIcon } from '../icons'
import LoadRecord, { RecordResult } from '../containers/load-record'
import { Record, ID } from '../record'

interface Props {
  resource: string
  id: ID | null
  onEdit: (event: React.SyntheticEvent) => void
  onClear: () => void
}

export default class Selection extends React.Component<Props, {}> {
  getPhoto(data: Record | null, fetching: Boolean, initialized: Boolean) {
    if (initialized && !fetching && data == null) {
      return <SelectionNotFound resource={this.props.resource} />
    }

    let showPhoto = data != null && this.props.id != null

    return showPhoto ? <SelectionFigure item={data} /> : null
  }

  renderContent({ data, fetching, initialized }: RecordResult) {
    let { resource, onEdit, onClear } = this.props

    let hasPicked = this.props.id != null

    let className = cx('ars-selection', {
      'ars-is-loading': fetching,
      'ars-has-photo': hasPicked
    })

    let title = selectionText({ item: hasPicked, fetching, resource })

    return (
      <div className={className}>
        {this.getPhoto(data, fetching, initialized)}

        <footer className="ars-selection-actions">
          <Button onClick={onEdit} title={title}>
            {hasPicked ? 'Edit' : title}
          </Button>
          <Button
            className="ars-button-muted"
            onClick={onClear}
            hidden={!hasPicked}
            title="Clear selection"
          >
            Clear
          </Button>
        </footer>
      </div>
    )
  }

  render() {
    return <LoadRecord id={this.props.id} render={this.renderContent.bind(this)} />
  }
}
