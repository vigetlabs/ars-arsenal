/**
 * Picker
 * The a modal that appears to select a gallery image
 * @flow
 */

import React from 'react'
import Button from './ui/button'
import ErrorMessage from './error-message'
import FocusTrap from 'react-focus-trap'
import Gallery from './gallery'
import Search from './search'
import TableView from './table-view'
import LoadCollection, { type Result } from '../containers/load-collection'
import { type Record } from '../record'

type Props = {
  url: *,
  makeQuery: *,
  makeURL: *,
  onChange: (Array<string | number>) => *,
  onExit: () => *,
  mode: 'gallery' | 'table',
  picked: Array<string | number>,
  multiselect: boolean,
  columns?: string[]
}

type State = {
  picked: Array<string | number>,
  mode: 'gallery' | 'table',
  search: string
}

export default class Picker extends React.Component<Props, State> {
  static defaultProps = {
    mode: 'gallery',
    picked: [],
    onChange: () => {},
    onExit: () => {},
    multiselect: false
  }

  constructor(props: Props, context: *) {
    super(props, context)

    this.state = {
      search: '',
      picked: props.picked,
      mode: props.mode
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
          onPicked={this._onPicked.bind(this)}
          onKeyDown={this._onKeyDown.bind(this)}
        />
      )
    }

    return (
      <Gallery
        items={data}
        picked={picked}
        onPicked={this._onPicked.bind(this)}
        onKeyDown={this._onKeyDown.bind(this)}
      />
    )
  }

  setMode(mode: 'gallery' | 'table', event: SyntheticEvent<*>) {
    event.preventDefault()
    this.setState({ mode })
  }

  renderContent({ data, fetching, error }: Result) {
    const { onExit } = this.props
    const { mode } = this.state

    return (
      <FocusTrap className="ars-dialog" onExit={onExit}>
        <header className="ars-dialog-header">
          <Search datalist={data} onChange={this._onSearchChange.bind(this)} />

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

        {this.renderItems(data)}

        <footer className="ars-dialog-footer">
          <div>
            <Button
              className="ars-dialog-clear"
              onClick={this._onClear.bind(this)}
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
              onClick={this._onConfirm.bind(this)}
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
    let { url, makeURL, makeQuery } = this.props
    let { search } = this.state

    return (
      <LoadCollection
        url={url}
        makeURL={makeURL}
        makeQuery={makeQuery}
        search={search}
      >
        {result => this.renderContent(result)}
      </LoadCollection>
    )
  }

  _onClear() {
    this.setState({ picked: [] })
  }

  _onSearchChange(search: string) {
    this.setState({ search })
  }

  _onPicked(picked: *) {
    this.setState({
      picked: this.props.multiselect
        ? this._onMultiSelectPicked(picked)
        : [picked]
    })
  }

  _onMultiSelectPicked(picked: Array<string | number>) {
    // Allow for multiple selections and toggling of selections
    let total = this.state.picked ? this.state.picked.slice() : []
    let pool = [].concat(picked)

    pool.forEach(function(item) {
      let index = total.indexOf(item)

      if (index === -1) {
        total = total.concat(item)
      } else {
        total.splice(index, 1)
      }
    })

    return total
  }

  _onConfirm(event: SyntheticEvent<*>) {
    event.preventDefault()
    this.confirm()
  }

  _onKeyDown(event: SyntheticKeyboardEvent<*>) {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      event.stopPropagation()

      this.confirm()
    }
  }
}
