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
  slugs: Array<string | number>,
  url: string
}

export default class MultiSelection extends React.Component<Props> {
  static defaultProps = {
    slugs: []
  }

  getItems() {
    let { slugs, url } = this.props

    if (!slugs.length) {
      return null
    }

    return (
      <div className="ars-multiselection-grid">
        {slugs.map(slug => (
          <MultiSelectionItem key={String(slug)} url={url} slug={slug} />
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="ars-multiselection">
        {this.getItems()}

        <Button
          onClick={this._onClick.bind(this)}
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

  _onClick(event: MouseEvent) {
    event.preventDefault()
    this.props.onClick(event)
  }
}
