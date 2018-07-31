/**
 * MultiSelection
 * @flow
 */

import React from 'react'
import Button from './ui/button'
import MultiSelectionItem from './multiselection-item'
import SelectionText from './selection-text'

type Props = {
  onClick: Event => *,
  resource: string,
  slug: string[],
  url: string
}

export default class MultiSelection extends React.Component<Props> {
  hasSlugs(): boolean {
    return !!this.props.slug && this.props.slug.length > 0
  }

  getItems() {
    let { slug, url } = this.props

    if (!this.hasSlugs()) {
      return null
    }

    return (
      <div className="ars-multiselection-grid">
        {slug.map((slug, key) =>
          React.createElement(MultiSelectionItem, { url, slug, key })
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="ars-multiselection">
        {this.getItems()}

        <Button
          ref="button"
          onClick={this._onClick.bind(this)}
          className="ars-selection-edit"
        >
          <SelectionText
            resource={this.props.resource}
            item={this.hasSlugs()}
            isPlural={true}
          />
          <span className="ars-selection-button-icon" aria-hidden="true" />
        </Button>
      </div>
    )
  }

  _onClick(event: MouseEvent) {
    event.preventDefault()
    this.props.onClick(event)
  }
}
