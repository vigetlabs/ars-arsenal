/**
 * LoadCollection
 * Fetch and present a list of items
 */

import * as React from 'react'
import OptionsContext from '../contexts/options'
import { Record } from '../record'
import {
  DEFAULT_OPTIONS,
  SortableColumn,
  ArsOptionsWithDeprecations
} from '../options'
import { stringify } from 'query-string'
import ScrollMonitor from '../components/scroll-monitor'
import { dedupe } from '../utils/collection'
import { LogLevel } from '../logger'

export interface CollectionResult {
  data: Record[]
  fetching: boolean
  error: string | null
}

interface Props extends ArsOptionsWithDeprecations {
  sort: SortableColumn
  search: string
  render: (result: CollectionResult) => React.ReactNode | null
}

interface State {
  data: Record[]
  error: string | null
  fetching: boolean
  targetUrl: string
  search: string
  sort: SortableColumn
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
    render: () => null
  }

  static getDerivedStateFromProps(nextProps: Props, lastState: State) {
    let { listUrl, listQuery, url, sort, search, logger } = nextProps

    let page = nextPage(nextProps, lastState)
    let baseUrl = listUrl(url)
    let query = { search, page, sort }
    let queryString = stringify(listQuery(query))

    if ('makeURL' in nextProps) {
      baseUrl = nextProps.makeURL(url)

      logger(
        LogLevel.Warning,
        'ArsArsenal option makeURL is deprecated. Use listUrl instead.'
      )
    }

    if ('makeQuery' in nextProps) {
      queryString = nextProps.makeQuery(search)

      logger(
        LogLevel.Warning,
        'ArsArsenal option makeURL is deprecated. Use listUrl instead.'
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
    let newContent = requests.some(
      request => request.valid && !request.fetching
    )

    for (var i = 0; i < requests.length; i += 1) {
      // Should we hit a case where new content is mixed with old, invalid content,
      // Filter out invalid requests. But only do this if there is new content,
      // otherwise the collection will flash empty while new results load in
      if (newContent && !requests[i].valid) {
        continue
      }

      if (requests[i].fetching) {
        break
      }

      data.push(...requests[i].data)
    }

    let unique = dedupe(data, 'id')

    if (unique.length < data.length) {
      this.props.logger(
        LogLevel.Error,
        `Duplicate records were returned from ${this.state.targetUrl}. ` +
          'ArsArsenal has deduplicated them, however check that your API response is ' +
          'returning unique results.'
      )
    }

    return unique
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
    // Refresh scrolling when these fields change. This causes the monitor to
    // start from a clean slate whenever new results come in.
    let token = [this.state.search, this.state.sort].join(':')

    return (
      <ScrollMonitor
        refresh={token}
        page={this.state.page}
        onPage={this.onPage}
      >
        {this.props.render(this.state)}
      </ScrollMonitor>
    )
  }

  private onPage = (page: number) => this.setState({ page })
}

type LoadCollectionProps = {
  search: string
  sort: SortableColumn
  render: (result: CollectionResult) => React.ReactNode | null
}

export default function LoadCollection(props: LoadCollectionProps) {
  return (
    <OptionsContext.Consumer>
      {options => <CollectionFetcher {...options} {...props} />}
    </OptionsContext.Consumer>
  )
}
