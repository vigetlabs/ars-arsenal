import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import TableHeading from './table-heading'
import Checker from './checker'
import cx from 'classnames'

class TableView extends React.Component {
  static defaultProps = {
    picked: [],
    items: [],
    columns: ['id', 'name', 'caption', 'attribution', 'preview']
  }

  state = {
    sortBy: 'id'
  }

  componentDidMount() {
    this.mounted = true
  }

  isPicked(id) {
    const { picked } = this.props

    return Array.isArray(picked) ? picked.indexOf(id) >= 0 : id === picked
  }

  renderRow(item, index) {
    const { id, name, attribution, caption, url } = item
    const { multiselect, onPicked } = this.props

    let className = cx({
      'ars-table-animate': !this.mounted
    })

    let animationDelay = 150 + index * 60 + 'ms'
    let checked = this.isPicked(id)

    return (
      <CSSTransition classNames="ars-table" timeout={480} unmountOnExit={true}>
        <tr className={className} style={{ animationDelay }}>
          <td className="ars-table-selection">
            <Checker
              checked={checked}
              name={name}
              id={id}
              multiselect={multiselect}
              onChange={onPicked}
            />
          </td>
          <td className="ars-table-id" hidden={!this.canRender('id')}>
            {id}
          </td>
          <td className="ars-table-name" hidden={!this.canRender('name')}>
            {name}
          </td>
          <td className="ars-table-caption" hidden={!this.canRender('caption')}>
            {caption}
          </td>
          <td
            className="ars-table-attribution"
            hidden={!this.canRender('attribution')}
          >
            {attribution}
          </td>
          <td className="ars-table-preview" hidden={!this.canRender('preview')}>
            <div className="ars-table-imagebox">
              <img src={url} />
            </div>
          </td>
        </tr>
      </CSSTransition>
    )
  }

  sortBy = sortBy => {
    this.setState({ sortBy })
  }

  canRender(field) {
    return this.props.columns.indexOf(field) >= 0
  }

  render() {
    const { items, multiselect, onKeyDown, onPicked } = this.props
    const { sortBy } = this.state

    let rows = items.concat().sort(function(a, b) {
      return `${a[sortBy]}` >= `${b[sortBy]}` ? 1 : -1
    })

    let ids = items.map(i => i.id)
    let unselected = ids.filter(this.isPicked, this)
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
                show={this.canRender('id')}
                onSort={this.sortBy}
              >
                ID
              </TableHeading>
              <TableHeading
                field="name"
                active={sortBy === 'name'}
                show={this.canRender('name')}
                onSort={this.sortBy}
              >
                Name
              </TableHeading>
              <TableHeading
                field="caption"
                active={sortBy === 'caption'}
                show={this.canRender('caption')}
                onSort={this.sortBy}
              >
                Caption
              </TableHeading>
              <TableHeading
                field="attribution"
                active={sortBy === 'attribution'}
                show={this.canRender('attribution')}
                onSort={this.sortBy}
              >
                Attribution
              </TableHeading>
              <TableHeading
                field="preview"
                active={sortBy === 'preview'}
                show={this.canRender('preview')}
              >
                Preview
              </TableHeading>
            </tr>
          </thead>
          <TransitionGroup component="tbody" className="ars-table">
            {rows.map(this.renderRow, this)}
          </TransitionGroup>
        </table>
      </div>
    )
  }
}

export default TableView
