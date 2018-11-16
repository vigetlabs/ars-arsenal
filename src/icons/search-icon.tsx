import * as React from 'react'
import IconFrame from './icon-frame'

interface Props {
  title?: string
}

const SearchIcon: React.SFC<Props> = ({ title }) => (
  <IconFrame>
    <title>{title}</title>
    <path
      opacity="0.54"
      d="M15.5,14h-0.79l-0.28-0.27C15.41,12.59,16,11.11,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5S5.91,16,9.5,16c1.61,0,3.09-0.59,4.23-1.57L14,14.71v0.79l5,4.99L20.49,19L15.5,14z M9.5,14C7.01,14,5,11.99,5,9.5S7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14z" />
    <path fill="none" d="M0,0h24v24H0V0z" />
  </IconFrame>
)

SearchIcon.defaultProps = {
  title: 'Enter Search Term'
}

export default SearchIcon
