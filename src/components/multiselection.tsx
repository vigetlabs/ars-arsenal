/**
 * MultiSelection
 */

import * as React from 'react'
import Button from './ui/button'
import MultiSelectionItem from './multiselection-item'
import SelectionText from './selection-text'
import { EditIcon } from '../icons'
import { ID } from '../record'

interface Props {
  resource?: string
  ids: ID[]
  onClick: (event: React.MouseEvent) => void
}

export default class MultiSelection extends React.Component<Props> {
  static defaultProps: Props = {
    ids: [],
    onClick: event => {}
  }

  getItems() {
    let { ids } = this.props

    if (!ids.length) {
      return null
    }

    return (
      <div className="ars-multiselection-grid">
        {ids.map(id => (
          <MultiSelectionItem key={id} id={id} />
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="ars-multiselection">
        {this.getItems()}

        <Button
          onClick={this.onClick.bind(this)}
          className="ars-selection-edit"
        >
          <SelectionText
            resource={this.props.resource}
            item={this.props.ids.length > 0}
            isPlural={true}
          />

          <EditIcon />
        </Button>
      </div>
    )
  }

  onClick(event: React.MouseEvent) {
    event.preventDefault()
    this.props.onClick(event)
  }
}
