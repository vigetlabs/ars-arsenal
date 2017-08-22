import React from 'react'
import cx from 'classnames'

export default function TableHeading({ children, field, active, onSort }) {
  let onClick = onSort ? onSort.bind(null, field) : null
  let className = cx(`ars-table-heading ars-table-${field}`, {
    'ars-active': active,
    'ars-sortable': !active && onSort
  })

  return (
    <th className={className} onClick={onClick}>
      {children}
    </th>
  )
}
