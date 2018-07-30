/**
 * Show
 * Fetch and present a single item
 * @flow
 */

import React from 'react'
import XHR from 'xhr'

type Props = {
  makeQuery: string => string,
  makeURL: (string, *) => string,
  onError: (*) => *,
  onFetch: (*) => *,
  url: string
}

type State = {
  fetching: boolean,
  error: boolean,
  search: string,
  data: *
}

export default class Show extends React.Component {
  static defaultProps = {
    makeQuery: query => `q=${query}`,
    makeURL: (url, id = false) => url + (id ? '/' + id : ''),
    onError: response => response,
    onFetch: data => data
  }

  state = {
    fetching: false,
    error: false,
    search: '',
    data: null
  }

  syncProps() {
    let { makeURL, makeQuery, onError, onFetch, url } = this.props
    return { makeURL, makeQuery, onError, onFetch, url }
  }

  request(url, success, error) {
    return XHR({ url, json: true }, function(err, response, body) {
      if (err) {
        error(body, err)
      } else if (response.statusCode >= 400) {
        error(response.body, new Error('Error ' + response.statusCode))
      } else {
        success(body)
      }
    })
  }

  fetch(slug) {
    let url = this.props.makeURL(this.props.url, slug)

    if (this.state.request) {
      this.state.request.abort()
    }

    if (this.state.search) {
      url = url + '?' + this.props.makeQuery(this.state.search)
    }

    this.setState({
      request: this.request(
        url,
        this.responseDidSucceed.bind(this),
        this.responseDidFail.bind(this)
      )
    })
  }

  fetchIf(slug) {
    if (slug || slug == 0) {
      this.setState({ fetching: true })
      this.fetch(slug)
    } else {
      this.setState({ data: null, fetching: false })
    }
  }

  componentWillMount() {
    this.fetchIf(this.props.slug)
  }

  componentWillReceiveProps(props) {
    if (props.slug !== this.props.slug) {
      this.fetchIf(props.slug)
    }
  }

  responseDidSucceed(response) {
    let data = this.props.onFetch(response)

    this.setState({ data, fetching: false, error: false })
  }

  responseDidFail(response) {
    let error = this.props.onError(response)

    this.setState({ error, data: false, fetching: false })
  }

  render() {
    return this.props.children ? this.props.children(this.state) : null
  }
}
