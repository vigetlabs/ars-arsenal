import * as React from 'react'

interface Props {
  fill?: string
  height?: number
  width?: number
}

const IconFrame: React.SFC<Props> = ({ width, height, fill, children }) => {
  const viewBox = `0 0 ${width} ${height}`

  return (
    <svg
      className="ars-icon"
      fill={fill}
      height={height}
      width={width}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

IconFrame.defaultProps = {
  fill: '#000000',
  height: 24,
  width: 24
}

export default IconFrame
