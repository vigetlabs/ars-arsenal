/**
 * Image
 * A wrapper around image elements to handle loading states
 * and transitions
 */

import React from "react";
import cx    from 'classnames';

let Image = React.createClass({

  getInitialState() {
    return {
      didFail  : false,
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

    let css = cx({
      'ars-img'        : true,
      'ars-img-loaded' : this.state.isLoaded,
      'ars-img-failed' : this.state.didFail,
      [className]      : true
    })

    return (
      <img className={ css }
           onLoad={ this._onLoad }
           onError={ this._onError }
           {...props } />
    )
  },

  _onLoad() {
    this.setState({ didFail: false, isLoaded: true })
  },

  _onError() {
    this.setState({ didFail: true, isLoaded: true })
  }

})

export default Image
