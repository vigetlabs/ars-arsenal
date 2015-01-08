/**
 * Ars
 * The main element for Ars Arsenal
 */

import Photo      from "../stores/photo"
import Picker     from "./picker"
import React      from "react"
import Selection  from "./selection"

let Types = React.PropTypes

let Ars = React.createClass({

  propTypes: {
    url      : Types.string.isRequired,
    onChange : Types.func
  },

  getDefaultProps() {
    return {
      onChange : () => {},
      picked   : null
    }
  },

  getInitialState() {
    return {
      dialogOpen : false,
      picked     : this.props.picked
    }
  },

  getPicker() {
    let { search, picked } = this.state
    let { url } = this.props

    return (
      <Picker key="dialog"
              onChange={ this._onGalleryPicked }
              onExit={ this._onExit }
              picked={ picked }
              url={ url } />
    )
  },

  render() {
    let { dialogOpen, picked, search } = this.state

    return (
      <div className="ars">
        <Selection onClick={ this._onOpenClick } slug={ picked } url={ this.props.url } />
        { dialogOpen && this.getPicker() }
      </div>
    )
  },

  _onOpenClick() {
    this.setState({ dialogOpen: true, search: null })
  },

  _onGalleryPicked(picked) {
    this.setState({ picked }, () => this.props.onChange(this.state.picked))
  },

  _onExit() {
    this.setState({ dialogOpen: false, search: null })
  }

})

export default Ars
