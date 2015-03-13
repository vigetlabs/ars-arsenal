/**
 * Image
 * A wrapper around image elements to handle loading states
 * and transitions
 */

import React from "react";

let Image = React.createClass({

  getInitialState() {
    return {
      isLoaded : false
    }
  },

  getDefaultProps() {
    return {
      className: ''
    }
  },

  render() {
    let { className, ...props} = this.props

    let css = `ars-img ${ className }`

    if (this.state.isLoaded) {
      css = `${ css } ars-img-loaded`
    }

    return (
      <img className={ css } onLoad={ this._onLoad } {...props } />
    )
  },

  _onLoad() {
    this.setState({ isLoaded: true })
  }

})

export default Image
