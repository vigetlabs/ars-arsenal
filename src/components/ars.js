/**
 * Ars
 * The main element for Ars Arsenal
 */

var Button    = require('./ui/button')
var Dialog    = require('./dialog')
var Photo     = require('../stores/photo')
var React     = require('react')
var Selection = require('./selection')

var Ars = React.createClass({

  getInitialState() {
    return {
      dialogOpen : false,
      error      : false,
      items      : [],
      picked     : null,
      search     : ''
    }
  },

  getDefaultProps() {
    return {
      url : 'photos.json',
    }
  },

  componentWillMount() {
    Photo.fetch(this.props.url, this.responseDidSucceed, this.responseDidFail)
  },

  responseDidSucceed(items) {
    this.setState({ items, error: false })
  },

  responseDidFail(error) {
    this.setState({ error })
  },

  getDialog() {
    var { items, search, picked } = this.state

    var allowed  = Photo.filter(items, search)
    var datalist = Photo.datalist(items)

    return (
      <Dialog datalist={ datalist }
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

    var record = items.find(i => i.id === picked)

    return (
      <div className="ars">
        <Selection onClick={ this._onOpenClick } photo={ record }/>
        { dialogOpen && this.getDialog() }
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
