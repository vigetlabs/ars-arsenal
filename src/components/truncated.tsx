import * as React from 'react'

interface TruncatedProps {
  text: string
  limit?: number
}

const Truncated: React.SFC<TruncatedProps> = ({ text, limit }) => {
  let shortText = text.slice(0, limit)

  if (shortText === text) {
    return <>{text}</>
  }

  return (
    <abbr className="ars-truncated" title={text}>
      {shortText}…
    </abbr>
  )
}

Truncated.defaultProps = {
  limit: 40
}

export default Truncated
