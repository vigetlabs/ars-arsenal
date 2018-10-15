/**
 * Datalist
 */

import * as React from 'react'
import { Record } from '../record'

interface Props {
  id: string
  items: Record[]
}

function getOption(record: Record) {
  return <option key={record.id}>{record.caption}</option>
}

export const DataList: React.SFC<Props> = ({ id, items = [] }) => {
  return <datalist id={id}>{items.map(getOption)}</datalist>
}
