/**
 * Gallery
 * Displays tiles of photos
 */

import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Figure from './figure'
import GalleryPanel from './gallery-panel'
import { Record, ID } from '../record'
import { itemAnimationDelay } from './animation'

interface Props {
  items: Record[]
  picked: ID[]
  onPicked: (id: ID) => void
  onKeyDown: (event: React.KeyboardEvent) => void
  onTagClick: (tag: String) => void
}

interface State {
  focus: Record | null
}

export default class Gallery extends React.PureComponent<Props, State> {
  offset: number = 0

  state: State = {
    focus: null
  }

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
          <button
            className="ars-gallery-info"
            onClick={this.setFocus.bind(this, record)}
          >
            i
          </button>
        </div>
      </CSSTransition>
    )
  }

  render() {
    let { items, onKeyDown, onTagClick } = this.props
    let { focus } = this.state

    return (
      <div className="ars-gallery-wrapper" onKeyDown={onKeyDown}>
        <TransitionGroup
          className="ars-gallery"
          data-scroll-container="true"
        >
          {items.map(this.getItem, this)}
        </TransitionGroup>
        <GalleryPanel
          record={focus}
          onTagClick={onTagClick}
          onExit={this.clearFocus}
        />
      </div>
    )
  }

  setFocus = (focus: Record) => {
    this.setState({ focus })
  }

  clearFocus = () => {
    this.setState({ focus: null })
  }
}
