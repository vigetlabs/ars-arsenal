import * as React from 'react'
import TableHeading from './table-heading'
import Checker from './checker'
import Tag from '../tag'
import Truncated from '../truncated'
import cx from 'classnames'
import { ArsColumn, SortableColumn, DEFAULT_OPTIONS } from '../../options'
import { Record, ID } from '../../record'
import { itemAnimationDelay } from '../animation'

interface Props {
  columns: ArsColumn[]
  items: Record[]
  multiselect: boolean
  picked: ID[]
  sort: SortableColumn
  onKeyDown: (event: React.SyntheticEvent) => void
  onPicked: (ids: ID) => void
  onSort: (field: SortableColumn) => void
  onTagClick: (tag: String) => void
}

class TableView extends React.PureComponent<Props, null> {
  mounted?: boolean = false
  timer?: NodeJS.Timeout = null

  static defaultProps: Props = {
    picked: [],
    items: [],
    columns: DEFAULT_OPTIONS.columns,
    multiselect: false,
    onKeyDown: event => {},
    onPicked: ids => {},
    onSort: field => {},
    onTagClick: tag => {},
    sort: null
  }

  componentDidUpdate() {
    if (this.mounted) {
      return true
    }

    clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      this.mounted = true
    }, itemAnimationDelay(this.props.items.length))
  }

  isPicked(id: ID) {
    return this.props.picked.indexOf(id) >= 0
  }

  renderRow(item: Record, index: number, list: Record[]) {
    const { id, name, attribution, caption, url, tags } = item
    const { multiselect, onPicked, onTagClick } = this.props

    let animationDelay = itemAnimationDelay(index) + 'ms'
    let checked = this.isPicked(id)

    let className = cx('ars-table-row', {
      'ars-table-animate': !this.mounted,
      'ars-table-selected': checked
    })

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
        <td
          className="ars-table-name"
          hidden={!this.canRender('name')}
          title={name}
        >
          <Truncated text={name} />
        </td>
        <td className="ars-table-caption" hidden={!this.canRender('caption')}>
          <Truncated text={caption} />
        </td>
        <td
          className="ars-table-attribution"
          hidden={!this.canRender('attribution')}
        >
          <Truncated text={attribution} />
        </td>
        <td className="ars-table-tags" hidden={!this.canRender('tags')}>
          {this.renderTagList(item)}
        </td>
        <td className="ars-table-preview" hidden={!this.canRender('preview')}>
          <div className="ars-table-imagebox">
            <img src={url} />
          </div>
        </td>
      </tr>
    )
  }
  renderTagList(record: Record) {
    if (Array.isArray(record.tags) === false) {
      return null
    }

    return record.tags.map((tag, i) => (
      <Tag key={i} tag={tag} onClick={this.props.onTagClick} />
    ))
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
                field="tags"
                active={false}
                show={this.canRender('tags')}
              >
                Tags
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
