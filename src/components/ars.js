/**
 * Ars
 * The main element for Ars Arsenal
 */

import Photo      from "../stores/photo"
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
      <Picker key="dialog" { ...this.syncProps() } onChange={ this._onGalleryPicked } onExit={ this._onExit } picked={ picked } />
    )
  },

  render() {
    let { dialogOpen, picked } = this.state

    return (
      <div className="ars">
        <Selection { ...this.syncProps() } onClick={ this._onOpenClick } slug={ picked } />
        { dialogOpen && this.getPicker() }
      </div>
    )
  },

  _onOpenClick() {
    this.setState({ dialogOpen: true })
  },

  _onGalleryPicked(picked) {
    this.setState({ picked }, () => this.props.onChange(this.state.picked))
  },

  _onExit() {
    this.setState({ dialogOpen: false })
  }

})

export default Ars
