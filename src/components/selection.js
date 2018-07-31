/**
 * Selection
 * @flow
 */

import React from 'react'
import Button from './ui/button'
import SelectionFigure from './selection-figure'
import SelectionText from './selection-text'
import LoadRecord, { type Result } from '../containers/load-record'
import { type Record } from '../record'
import cx from 'classnames'

type Props = {
  resource: string,
  url: string,
  slug: *,
  onClick: (event: SyntheticEvent<*>) => *
}

export default class Selection extends React.Component<Props> {
  getPhoto(data: ?Record) {
    return data ? <SelectionFigure ref="photo" item={data} /> : null
  }

  renderContent({ data, fetching }: Result) {
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
      <LoadRecord url={this.props.url} slug={this.props.slug}>
        {result => this.renderContent(result)}
      </LoadRecord>
    )
  }
}
