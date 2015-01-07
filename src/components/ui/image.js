/**
 * Image
 * A wrapper around image elements to handle loading states
 * and transitions
 */

import React from "react/addons";

let cx = React.addons.classSet

let Image = React.createClass({

  getInitialState() {
    return {
      isLoaded : false
    }
  },

  getClassName(root) {
    let base   = cx('ars-img', root)
    let states = cx({
      'ars-img-loaded' : this.state.isLoaded
    })

    return cx(base, states)
  },

  render() {
    let { className, onLoad, ...props} = this.props

    return (
      <img className={ this.getClassName(className) } onLoad={ this._onLoad } {...props } />
    )
  },

  _onLoad() {
    this.setState({ isLoaded: true })

    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

})

export default Image
