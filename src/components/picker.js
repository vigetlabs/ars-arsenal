/**
 * Picker
 * The a modal that appears to select a gallery image
 */

import Button from './ui/button'
import Collection from '../mixins/collection'
import Error from './error'
import FocusTrap from 'react-focus-trap'
import Gallery from './gallery'
import React from 'react'
import Search from './search'
import createClass from 'create-react-class'
import TableView from './table-view'
import { func } from 'prop-types'

let Picker = createClass({
  mixins: [Collection],

  propTypes: {
    onChange: func.isRequired,
    onExit: func.isRequired
  },

  getDefaultProps() {
    return {
      mode: 'gallery',
      items: [],
      picked: []
    }
  },

  getInitialState() {
    return {
      picked: this.props.picked,
      mode: this.props.mode
    }
  },

  confirm() {
    this.props.onChange(this.state.picked)
    this.props.onExit()
  },

  renderItems() {
    const { columns, multiselect } = this.props
    const { items, mode, picked, search } = this.state

    if (items.length <= 0) {
      return (
        <p className="ars-empty">
          No items exist {search ? `for “${search}”.` : ''}
        </p>
      )
    }

    if (mode === 'table') {
      return (
        <TableView
          items={items}
          picked={picked}
          columns={columns}
          multiselect={multiselect}
          onPicked={this._onPicked}
          onKeyDown={this._onKeyDown}
        />
      )
    }

    return (
      <Gallery
        ref="gallery"
        items={items}
        picked={picked}
        onPicked={this._onPicked}
        onKeyDown={this._onKeyDown}
      />
    )
  },

  setMode(mode, event) {
    event.preventDefault()
    this.setState({ mode })
  },

  render() {
    const { onExit } = this.props
    const { mode, error, items } = this.state

    return (
      <FocusTrap className="ars-dialog" onExit={onExit}>
        <header className="ars-dialog-header">
          <Search
            key="search"
            ref="search"
            datalist={items}
            onChange={this._onSearchChange}
          />

          <Button
            className="ars-dialog-gallery"
            onClick={this.setMode.bind(null, 'gallery')}
            disabled={mode === 'gallery'}
          >
            <span className="ars-hidden">Gallery</span>
          </Button>

          <Button
            className="ars-dialog-table"
            onClick={this.setMode.bind(null, 'table')}
            disabled={mode === 'table'}
          >
            <span className="ars-hidden">Table</span>
          </Button>
        </header>

        <Error error={error} />

        {this.renderItems()}

        <footer className="ars-dialog-footer">
          <div>
            <Button
              ref="clear"
              className="ars-dialog-clear"
              onClick={this._onClear}
            >
              Clear Selection
            </Button>
          </div>
          <div>
            <Button ref="cancel" onClick={this.props.onExit}>
              Cancel
            </Button>
            <Button ref="confirm" onClick={this._onConfirm} raised>
              Okay
            </Button>
          </div>
        </footer>
      </FocusTrap>
    )
  },

  _onClear() {
    this.setState({ picked: [] })
  },

  _onSearchChange(search) {
    this.setState({ search }, this.fetch)
  },

  _onPicked(picked) {
    this.setState({
      picked: this.props.multiselect
        ? this._onMultiSelectPicked(picked)
        : [picked]
    })
  },

  _onMultiSelectPicked(picked) {
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
  },

  _onConfirm(e) {
    e.preventDefault()
    this.confirm()
  },

  _onKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()

      this.confirm()
    }
  }
})

export default Picker
