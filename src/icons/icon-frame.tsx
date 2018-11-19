import * as React from 'react'

interface Props {
  fill?: string
  height?: number
  width?: number
}

const IconFrame: React.SFC<Props> = ({ children, ...props }) => {
  const viewBox = `0 0 ${props.width} ${props.height}`

  return (
    <svg
      className="ars-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      {...props}
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

export function generateIcon<IconProps>(
  callback: (props: IconProps) => React.ReactNode
): React.SFC<IconProps> {
  return (props: IconProps) =>
    React.createElement(IconFrame, props, callback(props))
}

export default IconFrame
