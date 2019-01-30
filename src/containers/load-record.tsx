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
  initialized: boolean
}

interface Props extends ArsOptionsWithDeprecations {
  id: ID | null
  render: (result: RecordResult) => React.ReactNode | null
}

interface State {
  data: Record | null
  error: string | null
  fetching: boolean
  targetURL: string
  initialized: false
}

function isValidId(id: ID): boolean {
  return !!id || id === 0
}

class RecordFetcher extends React.Component<Props, State> {
  static defaultProps: Props = {
    ...DEFAULT_OPTIONS,
    id: null,
    render: result => null
  }

  static getDerivedStateFromProps(props: Props, lastState: State) {
    let { url, showUrl, id } = props

    let targetURL = showUrl(url, id)

    if ('makeURL' in props) {
      targetURL = props.makeURL(url, id)

      console.warn(
        'ArsArsenal option makeURL is deprecated. Use showUrl instead.'
      )
    }

    return { targetURL }
  }

  request: XMLHttpRequest | null = null

  state: State = {
    data: null,
    error: null,
    fetching: false,
    targetURL: '',
    initialized: false
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
    return nextURL !== lastURL && isValidId(props.id)
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
      fetching: false,
      initialized: true
    })
  }

  onFailure(error: Error) {
    this.setState({
      data: null,
      error: this.props.onError(error),
      fetching: false,
      initialized: true
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
  id: ID | null
  render: (result: RecordResult) => React.ReactNode | null
}

export default function LoadRecord(props: LoadRecordProps) {
  return (
    <OptionsContext.Consumer>
      {options => <RecordFetcher {...options} {...props} />}
    </OptionsContext.Consumer>
  )
}
