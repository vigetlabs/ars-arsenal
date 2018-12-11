import * as React from 'react'
import { findDOMNode } from 'react-dom'

interface Props {
  page: number
  onPage: (number: number) => void
}

class ScrollMonitor extends React.Component<Props, null> {
  teardown = () => {}
  lastChild: Element = null

  getElement(): Element {
    return findDOMNode(this) as Element
  }

  getScrollContainer(): Element {
    return this.getElement().querySelector('[data-scroll-container]')
  }

  getScrollTrigger(): Element | null {
    return this.getElement().querySelector('[data-scroll="true"]')
  }

  subscribe() {
    let element = this.getScrollContainer()

    if (element) {
      element.addEventListener('scroll', this.check, { passive: true })
      this.teardown = () => element.removeEventListener('scroll', this.check)
      this.check()
    }
  }

  componentDidMount() {
    this.subscribe()
  }

  componentDidUpdate(lastProps: Props) {
    if (this.props.page < lastProps.page) {
      this.lastChild = null
    }

    this.teardown()
    this.subscribe()
  }

  componentWillUnmount() {
    this.teardown()
  }

  check = () => {
    let container = this.getScrollContainer()
    let nextChild = this.getScrollTrigger()

    if (!nextChild || nextChild === this.lastChild) {
      return
    }

    let outer = container.getBoundingClientRect()
    let inner = nextChild.getBoundingClientRect()

    let halfBelowPage = outer.bottom + outer.height * 1.25

    if (inner.top < halfBelowPage) {
      this.lastChild = nextChild
      this.props.onPage(this.props.page + 1)
    }
  }

  render() {
    return this.props.children
  }
}

export default ScrollMonitor
