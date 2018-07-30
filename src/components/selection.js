/**
 * Selection
 */

import React from 'react'
import Button from './ui/button'
import SelectionFigure from './selection-figure'
import SelectionText from './selection-text'
import Show from '../containers/show'
import cx from 'classnames'

type Props = {
  resource: string,
  slug: string
}

export default class Selection extends React.Component<Props> {
  getPhoto(data) {
    return data ? <SelectionFigure ref="photo" item={data} /> : null
  }

  renderContent({ data, fetching }) {
    let className = cx('ars-selection', {
      'ars-is-loading': fetching,
      'ars-has-photo': data
    })

    return (
      <div className={className}>
        <div className="ars-selection-inner">
          {this.getPhoto(data)}

          <Button
            ref="button"
            onClick={this._onClick.bind(this)}
            className="ars-selection-edit"
          >
            <SelectionText
              resource={this.props.resource}
              item={data}
              fetching={fetching}
            />

            <span className="ars-selection-button-icon" aria-hidden="true" />
          </Button>
        </div>
      </div>
    )
  }

  render() {
    let { url, slug } = this.props

    return (
      <Show url={url} slug={slug} children={this.renderContent.bind(this)} />
    )
  }

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(e)
  }
}
