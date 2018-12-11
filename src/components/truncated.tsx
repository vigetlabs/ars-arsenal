import * as React from 'react'

interface TruncatedProps {
  text: string
  limit?: number
}

const Truncated: React.SFC<TruncatedProps> = ({ text, limit }) => {
  let fullText = `${text || ''}`.trim()
  let shortText = fullText.slice(0, limit)

  if (shortText === fullText) {
    return <span>{fullText}</span>
  }

  return (
    <abbr className="ars-truncated" title={fullText}>
      {shortText.trim()}…
    </abbr>
  )
}

Truncated.defaultProps = {
  limit: 40
}

export default Truncated
