/**
 * Gallery
 * Displays tiles of photos
 */

var React     = require('react/addons')
var Animation = React.addons.CSSTransitionGroup
var Photo     = require('../stores/photo')
var Error     = require('./error')
var Figure    = require('./figure')
var Search    = require('./search')

var Gallery = React.createClass({

  getInitialState() {
    return {
      items : []
    }
  },

  getDefaultProps() {
    return {
      url: 'photos.json'
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

  getItem(record) {
    return (
      <Figure key={ 'photo_' + record.id }
              picked={ record.id === this.state.picked }
              record={ record }
              onClick={ this._onFigureClick } />
    )
  },

  render() {
    var { error, items, search } = this.state

    var filtered = Photo.filter(items, search)
    var datalist = Photo.datalist(items)

    return (
      <Animation component="div" className="ars-gallery" transitionName="ars-gallery">
        <Search key="search" datalist={ datalist } onChange={ this._onSearchChange } />
        <Error key="error" error={ error } />
        { filtered.map(this.getItem) }
      </Animation>
    )
  },

  _onSearchChange(search) {
    this.setState({ search, picked: false })
  },

  _onFigureClick(picked) {
    this.setState({
      picked: picked !== this.state.picked && picked
    })
  }

})

module.exports = Gallery
