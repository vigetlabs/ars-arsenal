import * as React from 'react'
import { Record } from '../record'
import Tag from './tag'

interface TagListProps {
  className?: string
  record: Record
  onTagClick: (tag: string) => void
}

const TagList: React.SFC<TagListProps> = ({ className, record, onTagClick }) => {
  if (Array.isArray(record.tags) === false) {
    return null
  }

  return (
    <div className={className}>
      {record.tags.map((tag, i) => (
        <Tag key={i} tag={tag} onClick={onTagClick.bind(null, tag)} />
      ))}
    </div>
  )
}

export default TagList
