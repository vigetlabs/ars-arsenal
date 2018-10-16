/**
 * Search
 */

import * as React from 'react'
import { DataList } from './datalist'
import { Record } from '../record'

interface Props {
  data: Record[]
  onChange(search: string): void
}

interface State {
  search: string
}

let uid = 0

// The minimum number of characters before searching
const THRESHOLD = 2

// The minimum time between change events
const INTERVAL = 150

export default class Search extends React.Component<Props, State> {
  id: number
  timer?: number

  constructor(props: Props) {
    super(props)

    this.id = uid++

    this.state = {
      search: ''
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer)
  }

  render() {
    let inputId = `ars_search_${this.id}`
    let listId = `ars_search_list_${this.id}`

    return (
      <form className="ars-search" onSubmit={this.onSubmit.bind(this)}>
        <label className="ars-search-label" htmlFor={inputId}>
          Search
        </label>
        <input
          id={inputId}
          list={listId}
          type="search"
          className="ars-search-input"
          placeholder="Search"
          value={this.state.search}
          onChange={this.onChange.bind(this)}
          onKeyUp={this.onKeyUp.bind(this)}
        />
        <DataList id={listId} items={this.props.data} />
        <button className="ars-hidden">Submit</button>
      </form>
    )
  }

  private update() {
    clearTimeout(this.timer)

    this.timer = window.setTimeout(() => {
      const { search } = this.state
      this.props.onChange(search.length >= THRESHOLD ? search : '')
    }, INTERVAL)
  }

  private onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ search: event.target.value }, this.update.bind(this))
  }

  private onSubmit(event: React.FormEvent) {
    event.preventDefault()
    this.update()
  }

  private onKeyUp(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation()
      this.setState({ search: '' }, this.update.bind(this))
    }
  }
}
