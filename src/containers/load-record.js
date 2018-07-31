/**
 * Show
 * Fetch and present a single item
 * @flow
 */

import React from 'react'
import { request, isValidSlug } from './request'
import { type Record } from '../record'

type Props = {
  makeURL: (string, ?mixed) => string,
  onError: (*) => Error,
  onFetch: (*) => Record,
  url: string,
  slug: ?mixed,
  children: ?(Result) => *
}

type State = {
  fetching: boolean,
  error: ?Error,
  data: ?Record,
  targetURL: string,
  shouldFetch: boolean
}

export type Result = {
  error: ?Error,
  fetching: boolean,
  data: *
}

const identity = (n: *) => n

const makeURL = (url: string, id: *) => url + (id ? '/' + String(id) : '')

export default class LoadRecord extends React.PureComponent<Props, State> {
  lastRequest: ?XMLHttpRequest

  static defaultProps = {
    makeURL: makeURL,
    onError: identity,
    onFetch: identity
  }

  static getDerivedStateFromProps(props: Props, lastState: State): * {
    let targetURL = props.makeURL(props.url, props.slug)

    if (targetURL === lastState.targetURL) {
      return null
    }

    return { targetURL, shouldFetch: isValidSlug(props.slug) }
  }

  state = {
    data: null,
    error: null,
    fetching: false,
    targetURL: '',
    shouldFetch: false
  }

  componentDidMount() {
    this.fetch()
  }

  componentDidUpdate() {
    this.fetch()
  }

  fetch() {
    if (this.lastRequest) {
      this.lastRequest.abort()
      this.lastRequest = null
    }

    if (this.state.shouldFetch) {
      this.lastRequest = request(
        this.state.targetURL,
        this.onSuccess.bind(this),
        this.onFailure.bind(this)
      )
    }
  }

  onSuccess(body: *) {
    this.setState({
      data: this.props.onFetch(body),
      error: null,
      fetching: false
    })
  }

  onFailure(body: *) {
    this.setState({
      data: null,
      error: this.props.onError(body),
      fetching: false
    })
  }

  render() {
    return this.props.children ? this.props.children(this.state) : null
  }
}
