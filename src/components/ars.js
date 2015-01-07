/**
 * Ars
 * The main element for Ars Arsenal
 */

import Photo     from "../stores/photo"
import Picker    from "./picker"
import React     from "react"
import Selection from "./selection"
import Sync      from '../mixins/sync'

let Types = React.PropTypes

let Ars = React.createClass({

  mixins: [ Sync ],

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
      picked     : this.props.picked,
      search     : ''
    }
  },

  getPicker() {
    let { error, items, search, picked } = this.state

    let allowed  = Photo.filter(items, search)

    return (
      <Picker error={ error }
              items={ allowed }
              key="dialog"
              onSearch={ this._onSearchChange }
              onChange={ this._onGalleryPicked }
              onExit={ this._onExit }
              picked={ picked } />
    )
  },

  render() {
    let { dialogOpen, items, picked, search } = this.state

    let record = Photo.find(items, picked)

    return (
      <div className="ars">
        <Selection onClick={ this._onOpenClick } photo={ record }/>
        { dialogOpen && this.getPicker() }
      </div>
    )
  },

  _onOpenClick() {
    this.setState({ dialogOpen: true, search: null })
  },

  _onSearchChange(search) {
    this.setState({ search })
  },

  _onGalleryPicked(picked) {
    this.setState({ picked }, () => this.props.onChange(this.state.picked))
  },

  _onExit() {
    this.setState({ dialogOpen: false, search: null })
  }

})

export default Ars
