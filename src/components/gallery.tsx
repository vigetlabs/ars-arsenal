/**
 * Gallery
 * Displays tiles of photos
 */

import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Figure from './figure'
import Tag from './tag'
import { Record, ID } from '../record'
import { itemAnimationDelay } from './animation'

interface Props {
  items: Record[]
  picked: ID[]
  onPicked: (id: ID) => void
  onKeyDown: (event: React.KeyboardEvent) => void
  onTagClick: (tag: String) => void
}

export default class Gallery extends React.PureComponent<Props> {
  offset: number = 0

  isPicked(id: ID) {
    const { picked } = this.props

    return picked.indexOf(id) >= 0
  }

  trackMount = (index: number) => {
    this.offset = Math.max(this.offset, itemAnimationDelay(index))
  }

  getItem(record: Record, index: number, list: Record[]) {
    const { onPicked } = this.props

    let isPicked = this.isPicked(record.id)
    let delay = Math.max(0, itemAnimationDelay(index) - this.offset)

    return (
      <CSSTransition
        key={index}
        appear={true}
        classNames="ars-gallery"
        timeout={delay + 400}
        onEntered={this.trackMount.bind(this, index)}
        unmountOnExit={true}
      >
        <div
          className="ars-gallery-item"
          data-scroll={index == list.length - 1}
          style={{ transitionDelay: delay + 'ms' }}
        >
          <Figure picked={isPicked} record={record} onClick={onPicked} />
          <button className="ars-gallery-info">i</button>
        </div>
      </CSSTransition>
    )
  }

  renderTagList(record: Record) {
    if (Array.isArray(record.tags) === false) {
      return null
    }

    return (
      <div className="ars-gallery-item-tags">
        {record.tags.map((tag, i) => (
          <Tag key={i} tag={tag} onClick={this.props.onTagClick} />
        ))}
      </div>
    )
  }

  render() {
    let { items, onKeyDown } = this.props

    return (
      <TransitionGroup
        className="ars-gallery"
        onKeyDown={onKeyDown}
        data-scroll-container="true"
      >
        {items.map(this.getItem, this)}
      </TransitionGroup>
    )
  }
}
