import React from 'react'
import cx from 'classnames'

function Header({ children, field, active, onSort }) {
  let onClick = onSort ? onSort.bind(null, field) : null
  let className = cx(`ars-table-view-heading ars-table-view-${field}`, {
    'ars-active': active,
    'ars-sortable': !active && onSort
  })

  return (
    <th className={className} onClick={onClick}>
      {children}
    </th>
  )
}

function Checker({ multiselect, checked, disabled, id, name, onChange }) {
  if (disabled) {
    return null
  }

  return (
    <label className="ars-table-view-checker">
      <span className="ars-hidden">
        {checked ? 'Deselect' : 'Select'} {name}
      </span>

      <input
        type={multiselect ? 'checkbox' : 'radio'}
        onChange={onChange.bind(null, id)}
        checked={checked}
      />
    </label>
  )
}

class TableView extends React.Component {
  static defaultProps = {
    items: []
  }

  state = {
    sortBy: 'id'
  }

  componentDidMount() {
    this.mounted = true
  }

  renderRow(item, index) {
    const { id, name, attribution, caption, url } = item
    const { multiselect, picked, onPicked } = this.props

    let animationDelay = this.mounted ? 0 : 250
    let className = this.mounted ? 'ars-table-view-animate' : null
    let checked = picked.indexOf(id) >= 0

    animationDelay += index * 90 + 'ms'

    return (
      <tr key={id} className={className} style={{ animationDelay }}>
        <td className="ars-table-view-selection">
          <Checker
            checked={checked}
            name={name}
            id={id}
            multiselect={multiselect}
            onChange={onPicked}
          />
        </td>
        <td className="ars-table-view-id">
          {id}
        </td>
        <td className="ars-table-view-name">
          {name}
        </td>
        <td>
          {caption}
        </td>
        <td>
          {attribution}
        </td>
        <td className="ars-table-view-preview">
          <div className="ars-table-view-imagebox">
            <img src={url} />
          </div>
        </td>
      </tr>
    )
  }

  sortBy = sortBy => {
    this.setState({ sortBy })
  }

  render() {
    const { items, multiselect, onKeyDown, onPicked, picked } = this.props
    const { sortBy } = this.state

    let rows = items.concat().sort(function(a, b) {
      return `${a[sortBy]}` >= `${b[sortBy]}` ? 1 : -1
    })

    let ids = items.map(i => i.id)
    let unselected = ids.filter(id => picked.indexOf(id) < 0)
    let allPicked = unselected.length <= 0

    return (
      <div className="ars-table-view-wrapper" onKeyDown={onKeyDown}>
        <table className="ars-table-view">
          <thead>
            <tr>
              <th className="ars-table-view-selection">
                <span className="ars-hidden">
                  Use this column to select items
                </span>

                <Checker
                  id={allPicked ? ids : unselected}
                  name="all items"
                  checked={allPicked}
                  onChange={onPicked}
                  disabled={!multiselect}
                  multiselect
                />
              </th>
              <Header field="id" active={sortBy === 'id'} onSort={this.sortBy}>
                ID
              </Header>
              <Header
                field="name"
                active={sortBy === 'name'}
                onSort={this.sortBy}
              >
                Name
              </Header>
              <Header
                field="caption"
                active={sortBy === 'caption'}
                onSort={this.sortBy}
              >
                Caption
              </Header>
              <Header
                field="attribution"
                active={sortBy === 'attribution'}
                onSort={this.sortBy}
              >
                Attribution
              </Header>
              <Header field="preview" active={sortBy === 'preview'}>
                Preview
              </Header>
            </tr>
          </thead>
          <tbody>
            {rows.map(this.renderRow, this)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TableView
