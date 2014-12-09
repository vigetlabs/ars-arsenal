/**
 * Ars
 * The main element for Ars Arsenal
 */

var React   = require('react/addons')
var Photo   = require('../stores/photo')
var Gallery = require('./gallery')
var Error   = require('./error')

var Search  = require('./search')

var Ars = React.createClass({

  getInitialState() {
    return {
      error  : false,
      items  : [],
      search : ''
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

  render() {
    var { error, items, search } = this.state

    var filtered = Photo.filter(items, search)
    var datalist = Photo.datalist(items)

    return (
      <div className="ars">
        <section className="ars-dialog" role="dialog">

          <header className="ars-dialog-header">
            <h1 className="ars-dialog-title">
              Please select a photo
            </h1>
            <Search key="search" datalist={ datalist } onChange={ this._onSearchChange } />
          </header>

          <Error key="error" error={ error } />

          <Gallery items={ filtered } />

          <footer className="ars-dialog-footer">
            <button className="ars-button">Cancel</button>
            <button className="ars-button">Okay</button>
          </footer>

        </section>
      </div>
    )
  },

  _onSearchChange(search) {
    this.setState({ search })
  }

})

module.exports = Ars
