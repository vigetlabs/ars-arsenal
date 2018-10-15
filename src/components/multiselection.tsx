/**
 * MultiSelection
 */

import * as React from 'react'
import Button from './ui/button'
import MultiSelectionItem from './multiselection-item'
import SelectionText from './selection-text'
import { ID } from '../record'

interface Props {
  resource?: string
  slugs: ID[]
  onClick: (event: React.MouseEvent) => void
  url?: string
}

export default class MultiSelection extends React.Component<Props> {
  static defaultProps: Props = {
    slugs: [],
    onClick: event => {}
  }

  getItems() {
    let { slugs, url } = this.props

    if (!slugs.length) {
      return null
    }

    return (
      <div className="ars-multiselection-grid">
        {slugs.map(slug => (
          <MultiSelectionItem key={slug} url={url} slug={slug} />
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
            item={this.props.slugs.length > 0}
            isPlural={true}
          />
          <span className="ars-selection-button-icon" aria-hidden="true" />
        </Button>
      </div>
    )
  }

  onClick(event: React.MouseEvent) {
    event.preventDefault()
    this.props.onClick(event)
  }

}
