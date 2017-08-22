import React from 'react'
import Animation from 'react-addons-css-transition-group'
import TableHeading from './table-heading'
import Checker from './checker'
import cx from 'classnames'

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

    let className = cx({
      'ars-table-animate': !this.mounted
    })

    let animationDelay = 150 + index * 60 + 'ms'
    let checked = picked.indexOf(id) >= 0

    return (
      <tr key={id} className={className} style={{ animationDelay }}>
        <td className="ars-table-selection">
          <Checker
            checked={checked}
            name={name}
            id={id}
            multiselect={multiselect}
            onChange={onPicked}
          />
        </td>
        <td className="ars-table-id">
          {id}
        </td>
        <td className="ars-table-name">
          {name}
        </td>
        <td>
          {caption}
        </td>
        <td>
          {attribution}
        </td>
        <td className="ars-table-preview">
          <div className="ars-table-imagebox">
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
      <div className="ars-table-wrapper" onKeyDown={onKeyDown}>
        <table className="ars-table">
          <thead>
            <tr>
              <th className="ars-table-selection">
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
              <TableHeading
                field="id"
                active={sortBy === 'id'}
                onSort={this.sortBy}
              >
                ID
              </TableHeading>
              <TableHeading
                field="name"
                active={sortBy === 'name'}
                onSort={this.sortBy}
              >
                Name
              </TableHeading>
              <TableHeading
                field="caption"
                active={sortBy === 'caption'}
                onSort={this.sortBy}
              >
                Caption
              </TableHeading>
              <TableHeading
                field="attribution"
                active={sortBy === 'attribution'}
                onSort={this.sortBy}
              >
                Attribution
              </TableHeading>
              <TableHeading field="preview" active={sortBy === 'preview'}>
                Preview
              </TableHeading>
            </tr>
          </thead>
          <Animation
            component="tbody"
            transitionName="ars-table"
            transitionEnterTimeout={480}
            transitionLeaveTimeout={320}
          >
            {rows.map(this.renderRow, this)}
          </Animation>
        </table>
      </div>
    )
  }
}

export default TableView
