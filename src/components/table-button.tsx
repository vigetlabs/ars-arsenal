import * as React from 'react'
import Button from './ui/button'
import TableIcon from '../icons/table-icon'

interface Props {
  onClick: (type: String) => void
  disabled: boolean
}

const TableButton: React.SFC<Props> = ({ disabled, onClick }) => {
  return (
    <Button
      title="Switch to table view"
      className="ars-button-icon"
      onClick={() => onClick('table')}
      disabled={disabled}
    >
      <TableIcon />
    </Button>
  )
}

export default TableButton
