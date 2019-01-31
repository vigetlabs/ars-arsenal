import * as React from 'react'

interface Props {
  resource: String
}

const SelectionNotFound: React.SFC<Props> = ({ resource }) => (
  <div className="ars-selection-failed">
    <section className="ars-selection-failed-banner">
      <h3 className="ars-selection-failed-title">Unable to find {resource.toLowerCase()}</h3>
      <p className="ars-selection-failed-body">It may have been deleted.</p>
    </section>
  </div>
)

export default SelectionNotFound
