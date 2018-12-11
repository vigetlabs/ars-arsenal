import * as React from 'react'
import { Record } from '../record'
import FocusTrap from 'react-focus-trap'
import TagList from './tag-list'

interface GalleryPanelProps {
  record?: Record
  onTagClick: (tag: string) => void
  onExit: () => void
}

const GalleryPanel: React.SFC<GalleryPanelProps> = ({
  onTagClick,
  onExit,
  record
}) => {
  if (!record) {
    return null
  }

  return (
    <aside
      className="ars-gallery-panel"
      onKeyUp={exitIfEscaped(onExit)}
      tabIndex={0}
      ref={autoFocus}
    >
      <div className="ars-gallery-panel-imagebox">
        <img src={record.url} />
      </div>

      <div className="ars-gallery-panel-fields">
        <h3 className="ars-selection-title">{record.name}</h3>
        <p className="ars-selection-caption">{record.caption}</p>
        <TagList
          className="ars-gallery-tags"
          record={record}
          onTagClick={onTagClick}
        />
      </div>

      <button
        className="ars-gallery-panel-close"
        title="Close this panel"
        type="button"
        onClick={onExit}
      >
        <span className="ars-hidden">Close this panel</span>
        <span aria-hidden={true}>×</span>
      </button>
    </aside>
  )
}

const autoFocus = (el: HTMLElement) => el && el.focus()

const exitIfEscaped = (callback: () => void) => {
  return (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      callback()
    }
  }
}

export default GalleryPanel
