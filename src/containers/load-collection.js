/**
 * LoadCollection
 * Fetch and present a list of items
 * @flow
 */

import React from 'react'
import { request } from './request'
import { type Record } from '../record'

type Props = {
  makeURL: (string, ?mixed) => string,
  makeQuery: string => string,
  onError: (*) => Error,
  onFetch: (*) => Record[],
  url: string,
  children: ?(Result) => *,
  search: string
}

type State = {
  fetching: boolean,
  error: ?Error,
  data: Record[],
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
const makeQuery = (query: string) => `q=${query}`

export default class LoadCollection extends React.PureComponent<Props, State> {
  lastRequest: ?XMLHttpRequest

  static defaultProps = {
    makeURL: makeURL,
    makeQuery: makeQuery,
    onError: identity,
    onFetch: identity
  }

  static getDerivedStateFromProps(props: Props, lastState: State): * {
    let targetURL = props.makeURL(props.url)

    if (props.search) {
      targetURL += '?' + props.makeQuery(props.search)
    }

    if (targetURL === lastState.targetURL) {
      return { shouldFetch: false }
    }

    return { targetURL, shouldFetch: true }
  }

  state = {
    data: [],
    error: null,
    fetching: false,
    targetURL: '',
    shouldFetch: false
  }

  componentDidMount() {
    if (this.state.shouldFetch) {
      this.fetch()
    }
  }

  componentDidUpdate() {
    if (this.state.shouldFetch) {
      this.fetch()
    }
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

  onSuccess(body: *[]) {
    this.setState({
      data: this.props.onFetch(body),
      error: null,
      fetching: false
    })
  }

  onFailure(body: *) {
    this.setState({
      data: [],
      error: this.props.onError(body),
      fetching: false
    })
  }

  render() {
    return this.props.children ? this.props.children(this.state) : null
  }
}
