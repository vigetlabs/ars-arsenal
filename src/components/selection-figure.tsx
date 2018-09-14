/**
 * Selection Figure
 */

import * as React from 'react'
import Image from './ui/image'
import { Record, EmptyRecord } from '../record'

interface Props {
  item: Record
}

export default class SelectionFigure extends React.Component<Props> {
  static defaultProps = {
    item: EmptyRecord
  }

  getTitle(title: string) {
    let trimmed = title ? title.trim() : ''

    return trimmed.length ? (
      <p className="ars-selection-title">{trimmed}</p>
    ) : null
  }

  getCaption(caption: string) {
    let trimmed = caption ? caption.trim() : ''

    return trimmed.length ? (
      <p className="ars-selection-caption">{trimmed}</p>
    ) : null
  }

  render() {
    let { caption = '', name = '', url } = this.props.item

    return (
      <figure className="ars-selection-figure">
        <Image className="ars-selection-photo" alt={caption} src={url} />
        <figcaption className="ars-selection-desc">
          {this.getTitle(name)}
          {this.getCaption(caption)}
        </figcaption>
      </figure>
    )
  }
}
