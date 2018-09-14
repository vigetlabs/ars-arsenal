/**
 * Gallery
 * Displays tiles of photos
 */

import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Figure from './figure'
import cx from 'classnames'
import { Record, ID } from '../record'

interface Props {
  items: Record[]
  onPicked?: (id: ID) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  search: string
  picked: Array<string | number>
}

export default class Gallery extends React.Component<Props> {
  mounted: boolean

  static defaultProps: Props = {
    items: [],
    picked: null,
    search: ''
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
    let key = String(record.id)

    return (
      <CSSTransition
        key={key}
        classNames="ars-figure"
        timeout={480}
        unmountOnExit={true}
      >
        <div className={className} style={{ animationDelay }}>
          <Figure
            picked={isPicked}
            record={record}
            onClick={this.props.onPicked}
          />
        </div>
      </CSSTransition>
    )
  }

  render() {
    let { items, onKeyDown } = this.props

    return (
      <TransitionGroup className="ars-gallery" onKeyDown={onKeyDown}>
        {items.map(this.getItem, this)}
      </TransitionGroup>
    )
  }
}
