/**
 * Image
 * A wrapper around image elements to handle loading states and
 * transitions
 * @flow
 */

import React from 'react'
import cx from 'classnames'

type Props = {
  className: string,
  src: string
}

type State = {
  didFail: boolean,
  isLoaded: boolean,
  prevSrc: ?string
}

export default class Image extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    src: null
  }

  static getDerivedStateFromProps(next: Props, last: State) {
    return {
      prevSrc: next.src,
      isLoaded: next.src === last.prevSrc
    }
  }

  state = {
    didFail: false,
    isLoaded: false,
    prevSrc: null
  }

  render() {
    let css = cx(this.props.className, {
      'ars-img': true,
      'ars-img-loaded': this.state.isLoaded,
      'ars-img-failed': this.state.didFail
    })

    return (
      <img
        {...this.props}
        onLoad={this._onLoad.bind(this)}
        onError={this._onError.bind(this)}
        className={css}
      />
    )
  }

  _onLoad() {
    this.setState({ didFail: false, isLoaded: true })
  }

  _onError() {
    this.setState({ didFail: true, isLoaded: true })
  }
}
