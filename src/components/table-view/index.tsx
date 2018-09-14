import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import TableHeading from './table-heading'
import Checker from './checker'
import cx from 'classnames'
import { ArsColumn } from '../../options'
import { Record, ID } from '../../record'

interface Props {
  picked: ID[]
  items: Record[]
  columns: ArsColumn[]
  multiselect: boolean
  onKeyDown: (event: React.SyntheticEvent) => void
  onPicked: (slugs: ID | ID[]) => void
}

interface State {
  sortBy: keyof Record
}

class TableView extends React.Component<Props, State> {
  mounted?: boolean

  static defaultProps: Props = {
    picked: [],
    items: [],
    columns: ['id', 'name', 'caption', 'attribution', 'preview'],
    multiselect: false,
    onKeyDown: event => {},
    onPicked: slugs => {}
  }

  state: State = {
    sortBy: 'id'
  }

  componentDidMount() {
    this.mounted = true
  }

  isPicked(id: ID) {
    const { picked } = this.props

    return Array.isArray(picked) ? picked.indexOf(id) >= 0 : id === picked
  }

  renderRow(item: Record, index: number) {
    const { id, name, attribution, caption, url } = item
    const { multiselect, onPicked } = this.props

    let className = cx({
      'ars-table-animate': !this.mounted
    })

    let animationDelay = 150 + index * 60 + 'ms'
    let checked = this.isPicked(id)

    return (
      <CSSTransition
        key={id}
        classNames="ars-table"
        timeout={480}
        unmountOnExit={true}
      >
        <tr className={className} style={{ animationDelay }}>
          <td className="ars-table-selection">
            <Checker
              checked={checked}
              name={name}
              slug={id}
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

  changeSort = (field: keyof Record) => {
    this.setState({ sortBy: field })
  }

  canRender(field: ArsColumn): boolean {
    return this.props.columns.indexOf(field) >= 0
  }

  sortItems(data: Record[], key: keyof Record) {
    return data.concat().sort(function(a: Record, b: Record) {
      return `${a[key]}` >= `${b[key]}` ? 1 : -1
    })
  }

  render() {
    const { items, multiselect, onKeyDown, onPicked } = this.props
    const { sortBy } = this.state

    let rows = this.sortItems(items, sortBy)
    let ids = items.map((record: Record) => record.id)
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
                  slug={allPicked ? ids : unselected}
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
                onSort={this.changeSort}
              >
                ID
              </TableHeading>
              <TableHeading
                field="name"
                active={sortBy === 'name'}
                show={this.canRender('name')}
                onSort={this.changeSort}
              >
                Name
              </TableHeading>
              <TableHeading
                field="caption"
                active={sortBy === 'caption'}
                show={this.canRender('caption')}
                onSort={this.changeSort}
              >
                Caption
              </TableHeading>
              <TableHeading
                field="attribution"
                active={sortBy === 'attribution'}
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
          <TransitionGroup component="tbody">
            {rows.map(this.renderRow, this)}
          </TransitionGroup>
        </table>
      </div>
    )
  }
}

export default TableView
