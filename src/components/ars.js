/**
 * Ars
 * The main element for Ars Arsenal
 */

var Picker    = require('./picker')
var Photo     = require('../stores/photo')
var React     = require('react')
var Selection = require('./selection')
var Sync      = require('../mixins/sync')
var Types     = React.PropTypes

var Ars = React.createClass({

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
    var { error, items, search, picked } = this.state

    var allowed  = Photo.filter(items, search)

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
    var { dialogOpen, items, picked, search } = this.state

    var record = Photo.find(items, picked)

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

module.exports = Ars
