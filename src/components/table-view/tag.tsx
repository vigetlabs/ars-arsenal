import * as React from 'react'

interface TagProps {
  tag: string
  onClick: (tag: string) => void
}

const Tag: React.SFC<TagProps> = props => {
  const onClick = (event: React.SyntheticEvent) => {
    event.preventDefault()
    props.onClick(props.tag)
  }

  const title = `Search by ${props.tag}`

  return (
    <button className="ars-tag" onClick={onClick} title={title}>
      {props.tag}
    </button>
  )
}

export default Tag
