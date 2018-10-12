/**
 * Gallery
 * Displays tiles of photos
 */

import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Figure from './figure'
import cx from 'classnames'
import { Record, ID } from '../record'
import { itemAnimationDelay } from './animation'

interface Props {
  items: Record[]
  onPicked?: (id: ID) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  search: string
  picked: Array<string | number>
}

export default class Gallery extends React.Component<Props> {
  mounted: boolean
  container: HTMLElement

  static defaultProps: Props = {
    items: [],
    picked: null,
    search: ''
  }

  componentDidMount() {
    this.mounted = true
  }

  isPicked(id: ID) {
    const { picked } = this.props

    return Array.isArray(picked) ? picked.indexOf(id) >= 0 : id === picked
  }

  getItem(record: Record, index: number, list: Record[]) {
    const { onPicked, picked } = this.props

    let isPicked = this.isPicked(record.id)

    let className = cx('ars-gallery-item', {
      'ars-gallery-animate': !this.mounted
    })

    let animationDelay = itemAnimationDelay(index)

    return (
      <CSSTransition
        key={record.id}
        classNames="ars-figure"
        timeout={480}
        unmountOnExit={true}
      >
        <div
          className={className}
          style={{ animationDelay }}
          data-scroll={index == list.length - 1}
        >
          <Figure picked={isPicked} record={record} onClick={onPicked} />
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
