/**
 * Gallery
 * Displays tiles of photos
 */

var React     = require('react/addons')
var Animation = React.addons.CSSTransitionGroup
var Figure    = require('./figure')

var Gallery = React.createClass({

  getDefaultProps() {
    return {
      items: []
    }
  },

  getInitialState() {
    return {
      picked: false
    }
  },

  componentWillReceiveProps() {
    this.setState({ picked: false})
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
    return (
      <Animation component="div" className="ars-gallery" transitionName="ars-fig">
        { this.props.items.map(this.getItem) }
      </Animation>
    )
  },

  _onFigureClick(picked) {
    this.setState({
      picked: picked !== this.state.picked && picked
    })
  }

})

module.exports = Gallery
