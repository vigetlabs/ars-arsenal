import * as React from 'react'

interface Props {
  fetching: boolean
  search: string
}

const Empty: React.SFC<Props> = ({ fetching, search }) => {
  if (fetching) {
    return <p className="ars-empty ars-lag">Awaiting data...</p>
  }
  return (
    <p className="ars-empty">
      No items exist {search ? `for “${search}”.` : ''}
    </p>
  )
}

export default Empty
