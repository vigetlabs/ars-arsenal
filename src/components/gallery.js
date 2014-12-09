/**
 * Gallery
 * Displays tiles of photos
 */

var React     = require('react/addons')
var Animation = React.addons.CSSTransitionGroup
var Photo     = require('../stores/photo')
var Error     = require('./error')
var Image     = require('./image')

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
    return <Image key={ 'photo_' + record.id } src={ record.url } />
  },

  render() {
    var { error, items } = this.state

    return (
      <Animation component="div" className="col-gallery" transitionName="col-gallery">
        <Error key="error" error={ error } />
        { items.map(this.getItem) }
      </Animation>
    )
  }

})

module.exports = Gallery
