/**
 * Figure
 * An individual gallery tile
 */

import * as React from 'react'
import Ink from 'react-ink'
import cx from 'classnames'
import Image from './ui/image'
import { Record, ID } from '../record'

interface Props {
  record: Record
  onClick: (id: ID, picked: boolean) => void
  picked: boolean
}

const Figure: React.SFC<Props> = ({ record, picked, onClick }) => {
  const className = cx('ars-fig', {
    'ars-fig-picked': picked
  })

  const clickHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    onClick(record.id, !picked)
  }

  return (
    <button className={className} onClick={clickHandler}>
      <Image key={record.url} className="ars-fig-img" src={record.url} />
      <span className="ars-fig-caption">{record.name}</span>
      <Ink opacity={0.4} />
    </button>
  )
}

export default Figure
