/**
 * MultiSelection
 */

import React from 'react'
import Button from './ui/button'
import MultiSelectionItem from './multiselection-item'
import SelectionText from './selection-text'
import createClass from 'create-react-class'
import { string, array } from 'prop-types'

let MultiSelection = createClass({
  propTypes: {
    resource: string.isRequired,
    slug: array
  },

  getItems() {
    let { slug, url } = this.props
    if (slug && slug.length > 0) {
      return (
        <div className="ars-multiselection-grid">
          {slug.map((s, i) =>
            <MultiSelectionItem key={i} slug={s} url={url} />
          )}
        </div>
      )
    }
  },

  render() {
    let { slug } = this.props

    return (
      <div className="ars-multiselection">
        {this.getItems()}

        <Button
          ref="button"
          onClick={this._onClick}
          className="ars-selection-edit"
        >
          <SelectionText
            resource={this.props.resource}
            item={slug && slug.length > 0}
            isPlural={true}
          />
          <span className="ars-selection-button-icon" aria-hidden="true" />
        </Button>
      </div>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(e)
  }
})

export default MultiSelection
