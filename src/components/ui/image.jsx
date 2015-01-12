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

  render() {
    let { className, ...props} = this.props

    let css = cx({
      'ars-img'        : true,
      'ars-img-loaded' : this.state.isLoaded,
      [className]      : true
    })

    return (
      <img className={ css } onLoad={ this._onLoad } {...props } />
    )
  },

  _onLoad() {
    this.setState({ isLoaded: true })
  }

})

export default Image
