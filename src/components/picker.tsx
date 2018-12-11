/**
 * Picker
 * The a modal that appears to select a gallery image
 */

import * as React from 'react'
import Button from './ui/button'
import ErrorMessage from './error-message'
import FocusTrap from 'react-focus-trap'
import Gallery from './gallery'
import Search from './search'
import TableView from './table-view'
import LoadCollection from '../containers/load-collection'
import ScrollMonitor from './scroll-monitor'
import Empty from './empty'
import { ID, Record } from '../record'
import { ArsColumn, SortableColumn, ArsMode } from '../options'

interface Props {
  columns?: ArsColumn[]
  mode: ArsMode
  multiselect: boolean
  onChange: (selection: ID[]) => void
  onExit: () => void
  picked: Array<string | number>
}

interface State {
  mode: 'gallery' | 'table'
  picked: ID[]
  currentSearch: string
  queriedSearch: string
  sort: SortableColumn
}

export default class Picker extends React.Component<Props, State> {
  static defaultProps: Props = {
    mode: 'gallery',
    multiselect: false,
    onChange: () => {},
    onExit: () => {},
    picked: []
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      mode: props.mode,
      picked: props.picked,
      currentSearch: '',
      queriedSearch: '',
      sort: 'id'
    }
  }

  confirm() {
    this.props.onChange(this.state.picked)
    this.props.onExit()
  }

  renderItems(data: Record[], fetching: boolean) {
    const { columns, multiselect } = this.props
    const { mode, picked, currentSearch, queriedSearch, sort } = this.state

    if (data.length === 0) {
      return <Empty search={queriedSearch} fetching={fetching} />
    }

    if (mode === 'table') {
      return (
        <TableView
          columns={columns}
          items={data}
          multiselect={multiselect}
          picked={picked}
          sort={sort}
          onSort={this.onSort.bind(this)}
          onPicked={this.onPicked.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          onTagClick={this.onTagClick.bind(this)}
        />
      )
    }

    return (
      <Gallery
        items={data}
        picked={picked}
        onPicked={this.onPicked.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
      />
    )
  }

  onTagClick(tag: string) {
    this.setState({ currentSearch: tag, queriedSearch: tag })
  }

  onSort(sort: SortableColumn) {
    this.setState({ sort })
  }

  setMode(mode: 'gallery' | 'table', event: React.SyntheticEvent) {
    event.preventDefault()
    this.setState({ mode })
  }

  renderContent({
    data,
    fetching,
    error
  }: {
    data: Record[]
    fetching: boolean
    error: Error | null
  }) {
    const { onExit } = this.props
    const { mode, currentSearch } = this.state

    return (
      <FocusTrap className="ars-dialog" onExit={onExit}>
        <header className="ars-dialog-header">
          <Search
            data={data}
            search={currentSearch}
            onChange={this.onSearchChange.bind(this)}
            onQuery={this.onQueryChange.bind(this)}
          />

          <Button
            className="ars-dialog-gallery"
            onClick={this.setMode.bind(this, 'gallery')}
            disabled={mode === 'gallery'}
          >
            <span className="ars-hidden">Gallery</span>
          </Button>

          <Button
            className="ars-dialog-table"
            onClick={this.setMode.bind(this, 'table')}
            disabled={mode === 'table'}
          >
            <span className="ars-hidden">Table</span>
          </Button>
        </header>

        <ErrorMessage error={error} />

        {this.renderItems(data, fetching)}

        <footer className="ars-dialog-footer">
          <div>
            <Button
              className="ars-dialog-clear"
              onClick={this.onClear.bind(this)}
            >
              <span className="ars-dialog-clear-text">Clear</span>
            </Button>
          </div>
          <div>
            <Button className="ars-dialog-cancel" onClick={this.props.onExit}>
              Cancel
            </Button>
            <Button
              className="ars-dialog-confirm"
              onClick={this.onConfirm.bind(this)}
              raised
            >
              Okay
            </Button>
          </div>
        </footer>
      </FocusTrap>
    )
  }

  render() {
    let { sort, queriedSearch } = this.state

    return (
      <LoadCollection
        sort={sort}
        search={queriedSearch}
        render={this.renderContent.bind(this)}
      />
    )
  }

  private onClear() {
    this.setState({ picked: [] })
  }

  private onSearchChange(currentSearch: string) {
    this.setState({ currentSearch })
  }

  private onQueryChange(queriedSearch: string) {
    this.setState({ queriedSearch })
  }

  private onPicked(picked: ID, shouldAdd: Boolean) {
    this.setState({
      picked: this.props.multiselect
        ? this.onMultiPicked([].concat(picked), shouldAdd)
        : [picked]
    })
  }

  private onMultiPicked(picked: ID[], shouldAdd: Boolean): ID[] {
    let pool = new Set(this.state.picked || [])

    picked.forEach(function(item) {
      if (shouldAdd) {
        pool.add(item)
      } else {
        pool.delete(item)
      }
    })

    let next: ID[] = []
    pool.forEach((item: ID) => next.push(item))

    return next
  }

  private onConfirm(event: React.SyntheticEvent) {
    event.preventDefault()
    this.confirm()
  }

  private onKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      event.stopPropagation()

      this.confirm()
    }
  }
}
