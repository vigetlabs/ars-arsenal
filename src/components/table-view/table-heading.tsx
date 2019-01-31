import * as React from 'react'
import cx from 'classnames'
import { ArsColumn } from '../../options'

interface Props {
  active: boolean
  children: React.ReactNode
  field: string
  onSort?: (string: ArsColumn) => void
  show: boolean
}

const TableHeading: React.SFC<Props> = props => {
  const { active, children, field, onSort, show } = props

  const className = cx(`ars-table-heading ars-table-${field}`, {
    'ars-active': active,
    'ars-sortable': !active && !!onSort
  })

  return (
    <th className={className} onClick={onSort && onSort.bind(null, field)} hidden={!show}>
      {children}
    </th>
  )
}

export default TableHeading
