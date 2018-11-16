import * as React from 'react'
import { ID } from '../../record'

interface Props {
  checked: boolean
  disabled?: boolean
  id: ID | ID[]
  multiselect: boolean
  name: string
  onChange: (id: ID | ID[]) => void
}

const Checker: React.SFC<Props> = props => {
  const { multiselect, checked, disabled, id, name, onChange } = props

  if (disabled) {
    return null
  }

  return (
    <label className="ars-table-checker">
      <span className="ars-hidden">
        {checked ? 'Deselect' : 'Select'} {name}
      </span>

      <input
        type={multiselect ? 'checkbox' : 'radio'}
        name="_ars_gallery_checker"
        onChange={onChange.bind(null, id, !checked)}
        checked={checked}
      />
    </label>
  )
}

Checker.defaultProps = {
  disabled: false
}

export default Checker
