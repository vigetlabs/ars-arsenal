/**
 * LoadCollection
 * Fetch and present a list of items
 */

import * as React from 'react'
import OptionsContext from '../contexts/options'
import { ID, Record } from '../record'
import { DEFAULT_OPTIONS, ArsOptionsWithDeprecations } from '../options'
import { stringify } from 'query-string'
import ScrollMonitor from '../components/scroll-monitor'

export interface CollectionResult {
  data: Record[]
  fetching: boolean
  error: string | null
}

interface Props extends ArsOptionsWithDeprecations {
  sort: keyof Record
  search: string
  render: (result: CollectionResult) => React.ReactNode | null
}

interface State {
  data: Record[]
  error: string | null
  fetching: boolean
  targetUrl: string
  search: string
  sort: keyof Record
  page: number
}

type Request = {
  error: string | null
  fetching: boolean
  data: Record[]
  xhr?: XMLHttpRequest
  valid: boolean
}

function nextPage(nextProps: Props, lastState: State) {
  if (
    nextProps.search !== lastState.search ||
    nextProps.sort !== lastState.sort
  ) {
    return 0
  }

  return lastState.page
}

class CollectionFetcher extends React.Component<Props, State> {
  static defaultProps: Props = {
    ...DEFAULT_OPTIONS,
    sort: 'id',
    search: '',
    render: result => null
  }

  static getDerivedStateFromProps(nextProps: Props, lastState: State) {
    let { listUrl, listQuery, url, sort, search } = nextProps

    let page = nextPage(nextProps, lastState)
    let baseUrl = listUrl(url)
    let query = { search, page, sort }
    let queryString = stringify(listQuery(query))

    if ('makeURL' in nextProps) {
      baseUrl = nextProps.makeURL(url)

      console.warn(
        'ArsArsenal option makeURL is deprecated. Use listUrl instead.'
      )
    }

    if ('makeQuery' in nextProps) {
      queryString = nextProps.makeQuery(search)

      console.warn(
        'ArsArsenal option makeQuery is deprecated. Use buildQuery instead.'
      )
    }

    return { page, sort, search, targetUrl: baseUrl + '?' + queryString }
  }

  requests: Request[] = []

  state: State = {
    data: [],
    page: 0,
    error: null,
    fetching: false,
    sort: 'id',
    search: '',
    targetUrl: ''
  }

  componentDidMount() {
    this.fetch()
  }

  componentDidUpdate(lastProps: Props, lastState: State) {
    if (
      lastState.search !== this.state.search ||
      lastState.sort !== this.state.sort
    ) {
      this.abort()
    }

    if (lastState.targetUrl !== this.state.targetUrl) {
      this.fetch()
    }
  }

  componentWillUnmount() {
    this.abort()
  }

  fetch() {
    let request: Request = {
      fetching: true,
      error: null,
      valid: true,
      data: []
    }

    request.xhr = this.props.request(
      this.state.targetUrl,
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

    // Filter invalid requests on success. This allows data to
    // remain in a reasonable state while other data loads
    this.requests = this.requests.filter(r => r.valid)

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

      request.valid = false
    })
  }

  render() {
    return (
      <ScrollMonitor page={this.state.page} onPage={this.onPage}>
        {this.props.render(this.state)}
      </ScrollMonitor>
    )
  }

  private onPage = (page: number) => this.setState({ page })
}

type LoadCollectionProps = {
  search: string
  sort: keyof Record
  render: (result: CollectionResult) => React.ReactNode | null
}

export default function LoadCollection(props: LoadCollectionProps) {
  return (
    <OptionsContext.Consumer>
      {options => <CollectionFetcher {...options} {...props} />}
    </OptionsContext.Consumer>
  )
}
