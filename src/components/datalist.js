/**
 * Datalist
 * @flow
 */

import React from 'react'
import { type Record } from '../record'

type Props = {
  id: string,
  items: Record[]
}

export default class DataList extends React.Component<Props> {
  static defaultProps = {
    items: []
  }

  getOption(record: Record) {
    return <option key={record.id}>{record.caption}</option>
  }

  render() {
    let { items, id } = this.props

    return <datalist id={id}>{items.map(this.getOption, this)}</datalist>
  }
}
