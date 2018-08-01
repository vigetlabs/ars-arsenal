/**
 * @flow
 */

import React from 'react'
import { DEFAULT_OPTIONS, ArsOptions } from '../options'
import { type ID } from '../record'
import { request } from './request'

type Props = ArsOptions & {
  children: ?(Result) => *,
  defaultValue: *,
  search: ?string,
  slug: ?ID
}

type State = {
  data: *,
  error: ?string,
  fetching: boolean,
  targetURL: string,
  shouldFetch: boolean
}

type Result = {
  error: ?string,
  fetching: boolean,
  data: *
}

export default class DataFetcher extends React.Component<Props, State> {
  lastRequest: ?XMLHttpRequest

  static defaultProps = {
    ...DEFAULT_OPTIONS,
    search: null,
    slug: null,
    defaultValue: null
  }

  static getDerivedStateFromProps(props: Props, lastState: State): * {
    throw new Error(
      'Children of DataFetcher must implement getDerivedStateFromProps'
    )
  }

  constructor(props: Props, context: *) {
    super(props, context)

    this.state = {
      data: this.props.defaultValue,
      error: null,
      fetching: false,
      shouldFetch: false,
      targetURL: ''
    }
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

    this.lastRequest = request(
      this.state.targetURL,
      this.onSuccess.bind(this),
      this.onFailure.bind(this)
    )
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
      data: this.props.defaultValue,
      error: this.props.onError(body),
      fetching: false
    })
  }

  render() {
    return this.props.children ? this.props.children(this.state) : null
  }
}
