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
import { ID, Record } from '../record'
import { ArsColumn, ArsMode } from '../options'
import ScrollMonitor from './scroll-monitor'

interface Props {
  columns?: ArsColumn[]
  mode: ArsMode
  multiselect: boolean
  onChange: (selection: ID[]) => void
  onExit: () => void
  picked: Array<string | number>
  url?: string
}

interface State {
  picked: ID[]
  mode: 'gallery' | 'table'
  search: string
  page: number
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
      search: '',
      picked: props.picked,
      mode: props.mode,
      page: 1
    }
  }

  confirm() {
    this.props.onChange(this.state.picked)
    this.props.onExit()
  }

  renderItems(data: Record[]) {
    const { columns, multiselect } = this.props
    const { mode, picked, search } = this.state

    if (data.length <= 0) {
      return (
        <p className="ars-empty">
          No items exist {search ? `for “${search}”.` : ''}
        </p>
      )
    }

    if (mode === 'table') {
      return (
        <TableView
          items={data}
          picked={picked}
          columns={columns}
          multiselect={multiselect}
          onPicked={this.onPicked.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
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

  setMode(mode: 'gallery' | 'table', event: React.SyntheticEvent) {
    event.preventDefault()
    this.setState({ mode })
  }

  onPage = (page: number) => {
    this.setState({ page })
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
    const { mode } = this.state

    return (
      <FocusTrap className="ars-dialog" onExit={onExit}>
        <header className="ars-dialog-header">
          <Search datalist={data} onChange={this.onSearchChange.bind(this)} />

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

        <ScrollMonitor onPage={this.onPage}>
          {this.renderItems(data)}
        </ScrollMonitor>

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
    return (
      <LoadCollection
        url={this.props.url}
        page={this.state.page}
        search={this.state.search}
        render={this.renderContent.bind(this)}
      />
    )
  }

  private onClear() {
    this.setState({ picked: [] })
  }

  private onSearchChange(search: string) {
    this.setState({ search })
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
