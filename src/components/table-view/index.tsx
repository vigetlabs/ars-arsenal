import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import TableHeading from './table-heading'
import Checker from './checker'
import cx from 'classnames'
import { ArsColumn, SortableColumn } from '../../options'
import { Record, ID } from '../../record'
import { itemAnimationDelay } from '../animation'

interface Props {
  columns: ArsColumn[]
  items: Record[]
  multiselect: boolean
  picked: ID[]
  sort: SortableColumn
  onKeyDown: (event: React.SyntheticEvent) => void
  onPicked: (ids: ID | ID[]) => void
  onSort: (field: SortableColumn) => void
}

class TableView extends React.Component<Props, null> {
  mounted?: boolean

  static defaultProps: Props = {
    picked: [],
    items: [],
    columns: ['id', 'name', 'caption', 'attribution', 'preview'],
    multiselect: false,
    onKeyDown: event => {},
    onPicked: ids => {},
    onSort: field => {},
    sort: 'id'
  }

  componentDidMount() {
    this.mounted = true
  }

  isPicked(id: ID) {
    const { picked } = this.props

    return Array.isArray(picked) ? picked.indexOf(id) >= 0 : id === picked
  }

  renderRow(item: Record, index: number, list: Record[]) {
    const { id, name, attribution, caption, url } = item
    const { multiselect, onPicked } = this.props

    let className = cx({
      'ars-table-animate': !this.mounted
    })

    let animationDelay = itemAnimationDelay(index)
    let checked = this.isPicked(id)

    return (
      <tr
        key={id}
        className={className}
        style={{ animationDelay }}
        data-scroll={index == list.length - 1}
      >
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
    )
  }

  changeSort = (field: SortableColumn) => {
    this.props.onSort(field)
  }

  canRender(field: ArsColumn): boolean {
    return this.props.columns.indexOf(field) >= 0
  }

  render() {
    const { items, multiselect, sort, onKeyDown, onPicked } = this.props

    let ids = items.map((record: Record) => record.id)
    let selected = ids.filter(this.isPicked, this)
    let allPicked = selected.length === ids.length

    return (
      <div
        className="ars-table-wrapper"
        onKeyDown={onKeyDown}
        data-scroll-container="true"
      >
        <table className="ars-table">
          <thead>
            <tr>
              <th className="ars-table-selection">
                <span className="ars-hidden">
                  Use this column to select items
                </span>

                <Checker
                  id={allPicked ? selected : ids}
                  name="all items"
                  checked={allPicked}
                  onChange={onPicked}
                  disabled={!multiselect}
                  multiselect
                />
              </th>
              <TableHeading
                field="id"
                active={sort === 'id'}
                show={this.canRender('id')}
                onSort={this.changeSort}
              >
                ID
              </TableHeading>
              <TableHeading
                field="name"
                active={sort === 'name'}
                show={this.canRender('name')}
                onSort={this.changeSort}
              >
                Name
              </TableHeading>
              <TableHeading
                field="caption"
                active={sort === 'caption'}
                show={this.canRender('caption')}
                onSort={this.changeSort}
              >
                Caption
              </TableHeading>
              <TableHeading
                field="attribution"
                active={sort === 'attribution'}
                show={this.canRender('attribution')}
                onSort={this.changeSort}
              >
                Attribution
              </TableHeading>
              <TableHeading
                field="preview"
                active={false}
                show={this.canRender('preview')}
              >
                Preview
              </TableHeading>
            </tr>
          </thead>
          <tbody>{items.map(this.renderRow, this)}</tbody>
        </table>
      </div>
    )
  }
}

export default TableView
