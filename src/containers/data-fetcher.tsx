import * as React from 'react'
import { DEFAULT_OPTIONS, ArsOptions } from '../options'
import { ID, Record } from '../record'

interface Props<Data> extends ArsOptions {
  defaultValue: Data | null
  search: string
  slug: ID | null
  render: (result: State<Data>) => React.ReactNode
}

interface State<Data> {
  data: Data
  error: string | null
  fetching: boolean
  targetURL: string
  endpointChanged: boolean
}

export default class DataFetcher<Data> extends React.Component<
  Props<Data>,
  State<Data>
> {
  lastRequest?: XMLHttpRequest

  static defaultProps: Props<null> = {
    ...DEFAULT_OPTIONS,
    search: '',
    slug: null,
    defaultValue: null,
    render: state => null
  }

  static getDerivedStateFromProps(props: Props<null>, lastState: State<null>) {
    let targetURL = props.makeURL(props.url, props.slug)

    if (props.search) {
      targetURL += '?' + props.makeQuery(props.search)
    }

    return { targetURL }
  }

  constructor(props: Props<Data>) {
    super(props)

    this.state = {
      data: this.props.defaultValue,
      error: null,
      fetching: false,
      endpointChanged: false,
      targetURL: ''
    }
  }

  componentDidMount() {
    if (this.shouldFetch(this.state.targetURL, null, this.props)) {
      this.fetch()
    }
  }

  componentDidUpdate(lastProps: Props<Data>, lastState: State<Data>) {
    if (
      this.shouldFetch(this.state.targetURL, lastState.targetURL, this.props)
    ) {
      this.fetch()
    }
  }

  shouldFetch(nextURL: string, lastURL: string | null, props: Props<Data>) {
    return nextURL !== lastURL
  }

  fetch() {
    if (this.lastRequest) {
      this.lastRequest.abort()
      this.lastRequest = null
    }

    this.lastRequest = this.props.request(
      this.state.targetURL,
      this.onSuccess.bind(this),
      this.onFailure.bind(this)
    )
  }

  onSuccess(body: Object) {
    this.setState({
      data: this.props.onFetch(body) as Data,
      error: null,
      fetching: false
    })
  }

  onFailure(error: Error) {
    this.setState({
      data: this.props.defaultValue,
      error: this.props.onError(error),
      fetching: false
    })
  }

  render() {
    return this.props.render ? this.props.render(this.state) : null
  }
}
