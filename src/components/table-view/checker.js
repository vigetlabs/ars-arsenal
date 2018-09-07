import React from 'react'

export default function Checker({
  multiselect,
  checked,
  disabled,
  id,
  name,
  onChange
}) {
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
        onChange={onChange.bind(null, id)}
        checked={checked}
      />
    </label>
  )
}
