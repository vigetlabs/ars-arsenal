/**
 * Image
 * A wrapper around image elements to handle loading states and
 * transitions
 */

import * as React from 'react'
import cx from 'classnames'

interface Props {
  className: string
  src: string | null | undefined
  alt?: string
}

interface State {
  didFail: boolean
  isLoaded: boolean
  prevSrc: string | null | undefined
}

export default class Image extends React.Component<Props, State> {
  static getDerivedStateFromProps(next: Props, last: State) {
    return {
      prevSrc: next.src,
      isLoaded: next.src === last.prevSrc
    }
  }

  state: State = {
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
        onLoad={this.onLoad.bind(this)}
        onError={this.onError.bind(this)}
        className={css}
      />
    )
  }

  private onLoad() {
    this.setState({ didFail: false, isLoaded: true })
  }

  private onError() {
    this.setState({ didFail: true, isLoaded: true })
  }
}
