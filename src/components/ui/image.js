/**
 * Image
 * A wrapper around image elements to handle loading states
 * and transitions
 */

var React = require('react/addons')
var cx    = React.addons.classSet

var Image = React.createClass({

  getInitialState() {
    return {
      isLoaded: false
    }
  },

  getClassName(root) {
    var base   = cx('ars-img', root)
    var states = cx({
      'ars-img-loaded' : this.state.isLoaded
    })

    return cx(base, states)
  },

  render() {
    var { className, onLoad, ...props} = this.props

    return <img className={ this.getClassName(className) } onLoad={ this._onLoad } {...props } />
  },

  _onLoad() {
    this.setState({ isLoaded: true })

    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

})

module.exports = Image
