/**
 * LoadRecord
 * Fetch and present a single item
 */

import * as React from 'react'
import OptionsContext from '../contexts/options'
import { ID, Record } from '../record'
import { DEFAULT_OPTIONS, ArsOptionsWithDeprecations } from '../options'

export interface RecordResult {
  data: Record | null
  error: string | null
  fetching: boolean
}

interface Props extends ArsOptionsWithDeprecations {
  slug: ID | null
  render: (result: RecordResult) => React.ReactNode | null
}

interface State {
  data: Record | null
  error: string | null
  fetching: boolean
  targetURL: string
}

function isValidSlug(slug: ID): boolean {
  return !!slug || slug === 0
}

class RecordFetcher extends React.Component<Props, State> {
  static defaultProps: Props = {
    ...DEFAULT_OPTIONS,
    slug: null,
    render: (result: RecordResult) => null
  }

  static getDerivedStateFromProps(props: Props, lastState: State) {
    let { url, showEndpoint, slug } = props

    return {
      targetURL: showEndpoint(url, slug)
    }
  }

  request: XMLHttpRequest | null = null

  state: State = {
    data: null,
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
    return nextURL !== lastURL && isValidSlug(props.slug)
  }

  fetch() {
    this.abort()

    this.request = this.props.request(
      this.state.targetURL,
      this.onSuccess.bind(this),
      this.onFailure.bind(this)
    )
  }

  onSuccess(data: Object) {
    this.setState({
      data: this.props.onFetch(data) as Record,
      error: null,
      fetching: false
    })
  }

  onFailure(error: Error) {
    this.setState({
      data: null,
      error: this.props.onError(error),
      fetching: false
    })
  }

  abort() {
    if (this.request != null) {
      this.request.abort()
    }
  }

  componentWillUnmount() {
    this.abort()
  }

  render() {
    return this.props.render ? this.props.render(this.state) : null
  }
}

type LoadRecordProps = {
  url?: string
  slug: ID | null
  render: (result: RecordResult) => React.ReactNode | null
}

export default function LoadRecord(props: LoadRecordProps) {
  return (
    <OptionsContext.Consumer>
      {options => <RecordFetcher {...options} {...props} />}
    </OptionsContext.Consumer>
  )
}
