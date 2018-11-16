import * as React from 'react'
import Button from './ui/button'
import GalleryIcon from '../icons/gallery-icon'

interface Props {
  onClick: (type: string) => void
  disabled: boolean
}

const GalleryButton: React.SFC<Props> = ({ disabled, onClick }) => {
  return (
    <Button
      title="Switch to gallery view"
      className="ars-button-icon"
      onClick={() => onClick('gallery')}
      disabled={disabled}
    >
      <GalleryIcon />
    </Button>
  )
}

export default GalleryButton
