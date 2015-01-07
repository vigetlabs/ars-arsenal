/**
 * Picker
 * The a modal that appears to select a gallery image
 */

import Button  from './ui/button'
import Dialog  from './ui/dialog'
import Gallery from './gallery'
import React   from 'react'
import Search  from './search'

let Types = React.PropTypes

let Picker = React.createClass({

  propTypes: {
    onChange : Types.func.isRequired,
    onExit   : Types.func.isRequired,
    onSearch : Types.func.isRequired
  },

  getDefaultProps() {
    return {
      items  : [],
      picked : false
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

  cancel() {
    this.props.onExit()
  },

  getError() {
    let error = this.props.error

    return error ? (
      <p className="ars-error">{ error }</p>
    ) : null
  },

  render() {
    let { error, items, onSearch, onChange, search } = this.props

    return (
      <Dialog onExit={ this.props.onExit }>

        <header className="ars-dialog-header">
          <h1 className="ars-dialog-title">Please select a photo</h1>
          <Search key="search" onChange={ onSearch } />
        </header>

        { this.getError() }

        <Gallery items={ items } picked={ this.state.picked } onPicked={ this._onPicked } onKeyDown={ this._onKeyDown } />

        <footer className="ars-dialog-footer">
          <Button onClick={ this.props.onExit }>Cancel</Button>
          <Button onClick={ this._onConfirm } raised>Okay</Button>
        </footer>

      </Dialog>
    )
  },

  _onPicked(picked) {
    this.setState({ picked })
  },

  _onCancel(e) {
    e.preventDefault()
    this.cancel()
  },

  _onConfirm(e) {
    e.preventDefault()
    this.confirm()
  },

  _onKeyDown(e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      this.confirm()
    }
  }

})

export default Picker
