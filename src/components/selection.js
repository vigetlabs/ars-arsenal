/**
 * Selection
 */

import Button from './ui/button'
import SelectionFigure from './selection-figure'
import SelectionText from './selection-text'
import React from 'react'
import Record from '../mixins/record'
import cx from 'classnames'
import createClass from 'create-react-class'
import { string } from 'prop-types'

let Selection = createClass({
  propTypes: {
    resource: string.isRequired
  },

  mixins: [Record],

  getPhoto() {
    let { item } = this.state
    return item ? <SelectionFigure ref="photo" item={item} /> : null
  },

  render() {
    let className = cx('ars-selection', {
      'ars-is-loading': this.state.fetching,
      'ars-has-photo': this.state.item
    })

    return (
      <div className={className}>
        <div className="ars-selection-inner">
          {this.getPhoto()}

          <Button
            ref="button"
            onClick={this._onClick}
            className="ars-selection-edit"
          >
            <SelectionText resource={this.props.resource} {...this.state} />
            <span className="ars-selection-button-icon" aria-hidden="true" />
          </Button>
        </div>
      </div>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(e)
  }
})

export default Selection
