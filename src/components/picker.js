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
import { func } from 'prop-types'

let Picker = createClass({
  mixins: [Collection],

  propTypes: {
    onChange: func.isRequired,
    onExit: func.isRequired
  },

  getDefaultProps() {
    return {
      items: [],
      picked: []
    }
  },

  getInitialState() {
    return {
      picked: this.props.picked
    }
  },

  confirm() {
    this.props.onChange(this.state.picked)
    this.props.onExit()
  },

  render() {
    let { error, items, search } = this.state

    return (
      <FocusTrap className="ars-dialog" onExit={this.props.onExit}>
        <header className="ars-dialog-header">
          <Search
            key="search"
            ref="search"
            datalist={items}
            onChange={this._onSearchChange}
          />
        </header>

        <Error error={error} />

        <Gallery
          ref="gallery"
          search={search}
          items={items}
          picked={this.state.picked}
          onPicked={this._onPicked}
          onKeyDown={this._onKeyDown}
        />

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
    let index = total.indexOf(picked)
    if (index === -1) {
      total = total.concat(picked)
    } else {
      total.splice(index, 1)
    }
    return total
  },

  _onConfirm(e) {
    e.preventDefault()
    this.confirm()
  },

  _onKeyDown({ key, metaKey, ctrlKey }) {
    if ((key === 'Enter' && metaKey) || ctrlKey) {
      this.confirm()
    }
  }
})

export default Picker
