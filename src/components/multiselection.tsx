/**
 * MultiSelection
 */

import * as React from 'react'
import cx from 'classnames'
import Button from './ui/button'
import MultiSelectionItem from './multiselection-item'
import selectionText from './selection-text'
import { ID } from '../record'

interface Props {
  resource?: string
  ids: ID[]
  onEdit: (event: React.MouseEvent) => void
  onClear: () => void
}

export default class MultiSelection extends React.Component<Props> {
  static defaultProps: Props = {
    ids: [],
    onClick: event => {}
  }

  getItems() {
    let { ids, resource } = this.props

    if (!ids.length) {
      return null
    }

    return (
      <div className="ars-multiselection-grid">
        {ids.map(id => (
          <MultiSelectionItem key={id} id={id} resource={resource} />
        ))}
      </div>
    )
  }

  render() {
    const { resource, ids, onEdit, onClear } = this.props

    let hasPicked = ids.length

    let title = selectionText({
      resource: resource,
      item: hasPicked,
      isPlural: true
    })

    let className = cx('ars-multiselection', {
      'ars-has-photo': hasPicked
    })

    return (
      <div className={className}>
        {this.getItems()}

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

  onClick = (event: React.MouseEvent) => {
    event.preventDefault()
    this.props.onClick(event)
  }
}
