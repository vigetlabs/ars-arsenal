/**
 * Figure
 * An individual gallery tile
 * @flow
 */

import React from 'react'
import Ink from 'react-ink'
import cx from 'classnames'
import Image from './ui/image'
import { type Record, type ID } from '../record'

type Props = {
  record: Record,
  onClick: ID => *,
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

  _onClick(event: SyntheticEvent<*>) {
    event.preventDefault()
    this.props.onClick(this.props.record.id)
  }
}
