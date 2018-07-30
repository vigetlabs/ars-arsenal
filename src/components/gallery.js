/**
 * Gallery
 * Displays tiles of photos
 * @flow
 */

import React from 'react'
import Animation from 'react-addons-css-transition-group'
import Figure from './figure'
import cx from 'classnames'
import { type Record } from '../record'

type Props = {
  items: Record[],
  onPicked: string => *,
  onKeyDown: Event => *,
  search: false | string,
  picked: false | string
}

export default class Gallery extends React.Component<Props> {
  mounted: boolean

  static defaultProps = {
    items: [],
    picked: false,
    search: false
  }

  componentDidMount() {
    this.mounted = true
  }

  getItem(record: Record, index: number) {
    let isPicked = this.props.picked
      ? this.props.picked.indexOf(record.id) !== -1
      : false

    let className = cx('ars-gallery-item', {
      'ars-gallery-animate': !this.mounted
    })

    let animationDelay = 150 + index * 60 + 'ms'

    return (
      <div className={className} key={record.id} style={{ animationDelay }}>
        <Figure
          picked={isPicked}
          record={record}
          onClick={this.props.onPicked}
        />
      </div>
    )
  }

  render() {
    let items = this.props.items

    return (
      <Animation
        component="div"
        className="ars-gallery"
        transitionName="ars-figure"
        onKeyDown={this.props.onKeyDown}
        transitionEnterTimeout={480}
        transitionLeaveTimeout={480}
      >
        {items.map(this.getItem, this)}
      </Animation>
    )
  }
}
