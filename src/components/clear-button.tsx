import * as React from 'react'
import Button from './ui/button'
import { ClearIcon } from '../icons'

interface Props {
  onClick: () => void
}

const ClearButton: React.SFC<Props> = ({ onClick }) => {
  return (
    <Button
      title="Clear Selection"
      className="ars-button-icon"
      onClick={onClick}
    >
      <ClearIcon />
    </Button>
  )
}

export default ClearButton
