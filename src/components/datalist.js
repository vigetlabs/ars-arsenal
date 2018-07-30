/**
 * Datalist
 */

import React from 'react'
import createClass from 'create-react-class'
import { string, array } from 'prop-types'

let DataList = createClass({
  propTypes: {
    id: string.isRequired,
    items: array
  },

  getDefaultProps() {
    return {
      items: []
    }
  },

  getOption(record) {
    return <option key={record.id}>{record.caption}</option>
  },

  render() {
    let { items, id } = this.props

    return <datalist id={id}>{items.map(this.getOption)}</datalist>
  }
})

export default DataList
