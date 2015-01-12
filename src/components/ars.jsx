/**
 * Ars
 * The main element for Ars Arsenal
 */

import Picker     from "./picker"
import React      from "react"
import Selection  from "./selection"
import Sync       from "../mixins/sync"

let Types = React.PropTypes

let Ars = React.createClass({

  mixins: [ Sync ],

  propTypes: {
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
    let { picked } = this.state

    return (
      <Picker key="dialog" ref="picker" { ...this.syncProps() } onChange={ this._onGalleryPicked } onExit={ this._onExit } picked={ picked } />
    )
  },

  render() {
    let { dialogOpen, picked } = this.state

    return (
      <div className="ars">
        <Selection ref="selection" { ...this.syncProps() } onClick={ this._onOpenClick } slug={ picked } />
        { dialogOpen && this.getPicker() }
      </div>
    )
  },

  _triggerChange() {
    this.props.onChange(this.state.picked)
  },

  _onOpenClick() {
    this.setState({ dialogOpen: true })
  },

  _onGalleryPicked(picked) {
    this.setState({ picked }, this._triggerChange)
  },

  _onExit() {
    this.setState({ dialogOpen: false })
  }

})

export default Ars
