/**
 * Figure
 * An individual gallery tile
 * @flow
 */

import React from 'react'
import Image from './ui/image'
import Ink from 'react-ink'
import cx from 'classnames'
import { type Record } from '../record'

type Props = {
  record: Record,
  onClick: string => *,
  picked: boolean
}

export default class Figure extends React.Component<Props> {
  render() {
    let { record, picked } = this.props

    let className = cx('ars-fig', {
      'ars-fig-picked': picked
    })

    return (
      <button className={className} onClick={this._onClick.bind(this)}>
        <Image className="ars-fig-img" src={record.url} />
        <span className="ars-fig-caption">{record.name}</span>
        <Ink opacity={0.4} />
      </button>
    )
  }

  _onClick(event: MouseEvent) {
    event.preventDefault()
    this.props.onClick(this.props.record.id)
  }
}
