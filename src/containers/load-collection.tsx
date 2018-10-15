/**
 * LoadCollection
 * Fetch and present a list of items
 */

import * as React from 'react'
import OptionsContext from '../contexts/options'
import { ID, Record } from '../record'
import { DEFAULT_OPTIONS, ArsOptionsWithDeprecations } from '../options'
import { stringify } from 'query-string'

export interface CollectionResult {
  data: Record[]
  fetching: boolean
  error: string | null
}

interface Props extends ArsOptionsWithDeprecations {
  search: string
  render: (result: CollectionResult) => React.ReactNode | null
  page: number
}

interface State {
  data: Record[]
  error: string | null
  fetching: boolean
  targetURL: string
}

type Request = {
  error: string | null
  fetching: boolean
  data: Record[]
  xhr?: XMLHttpRequest
}

class CollectionFetcher extends React.Component<Props, State> {
  static defaultProps: Props = {
    ...DEFAULT_OPTIONS,
    search: '',
    render: (result: CollectionResult) => null,
    page: 0
  }

  static getDerivedStateFromProps(props: Props, lastState: State) {
    let { listUrl, listQuery, url, page, search } = props

    let baseUrl = listUrl(url)
    let query = { search, page }
    let queryString = stringify(listQuery(query))

    if ('makeURL' in props) {
      baseUrl = props.makeURL(url)

      console.warn(
        'ArsArsenal option makeURL is deprecated. Use listUrl instead.'
      )
    }

    if ('makeQuery' in props) {
      queryString = props.makeQuery(search)

      console.warn(
        'ArsArsenal option makeQuery is deprecated. Use buildQuery instead.'
      )
    }

    return {
      targetURL: baseUrl + '?' + queryString
    }
  }

  requests: Request[] = []

  state: State = {
    data: [],
    error: null,
    fetching: false,
    targetURL: ''
  }

  componentDidMount() {
    if (this.shouldFetch(this.state.targetURL, null, this.props)) {
      this.fetch()
    }
  }

  componentDidUpdate(lastProps: Props, lastState: State) {
    if (
      this.shouldFetch(this.state.targetURL, lastState.targetURL, this.props)
    ) {
      this.fetch()
    }
  }

  shouldFetch(nextURL: string, lastURL: string | null, props: Props) {
    return nextURL !== lastURL
  }

  fetch() {
    let request: Request = {
      fetching: true,
      error: null,
      data: []
    }

    request.xhr = this.props.request(
      this.state.targetURL,
      this.onSuccess.bind(this, request),
      this.onFailure.bind(this, request)
    )

    this.requests.push(request)

    this.commit()
  }

  accumulate(requests: Request[]): Record[] {
    let data = []

    for (var i = 0; i < requests.length; i += 1) {
      if (requests[i].fetching) {
        break
      }

      data.push(...requests[i].data)
    }

    return data
  }

  onSuccess(request: Request, body: Object) {
    request.data = this.props.onFetch(body) as Record[]
    request.fetching = false

    this.commit()
  }

  onFailure(request: Request, error: Error) {
    request.data = []
    request.error = this.props.onError(error)
    request.fetching = false

    this.commit()
  }

  lastError() {
    let errors = this.requests.map(request => request.error).filter(Boolean)
    return errors ? errors.pop() : null
  }

  commit() {
    this.setState({
      data: this.accumulate(this.requests),
      error: this.lastError(),
      fetching: this.requests.some(item => item.fetching === true)
    })
  }

  abort() {
    this.requests.forEach(request => {
      if (request.xhr) {
        request.xhr.abort()
      }
    })
  }

  componentWillUnmount() {
    this.abort()
  }

  render() {
    return this.props.render ? this.props.render(this.state) : null
  }
}

type LoadCollectionProps = {
  page: number
  search: string
  render: (result: CollectionResult) => React.ReactNode | null
}

export default function LoadCollection(props: LoadCollectionProps) {
  return (
    <OptionsContext.Consumer>
      {options => (
        <CollectionFetcher key={props.search} {...options} {...props} />
      )}
    </OptionsContext.Consumer>
  )
}
