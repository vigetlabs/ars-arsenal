import * as React from 'react'
import { findDOMNode } from 'react-dom'

interface Props {
  onPage: (number: number) => void
}

class ScrollMonitor extends React.Component<Props, null> {
  page = 0
  threshold = 0
  teardown: () => void
  lastChild: Element = null

  getElement(): Element {
    return findDOMNode(this) as Element
  }

  subscribe() {
    let element = this.getElement()

    element.addEventListener('scroll', this.check, { passive: true })

    this.teardown = () => element.removeEventListener('scroll', this.check)

    this.check()
  }

  ignore() {
    this.teardown()
  }

  componentDidMount() {
    this.subscribe()
  }

  componentDidUpdate() {
    this.subscribe()
  }

  componentWillUnmount() {
    this.ignore()
  }

  check = () => {
    let container = this.getElement()
    let nextChild = container.querySelector('[data-scroll="true"]')

    if (!nextChild || nextChild === this.lastChild) {
      return
    }

    let outer = container.getBoundingClientRect()
    let inner = nextChild.getBoundingClientRect()

    let halfBelowPage = outer.bottom + outer.height * 1.5

    if (inner.top < halfBelowPage) {
      this.page += 1
      this.props.onPage(this.page)
      this.lastChild = nextChild
    }
  }

  render() {
    return this.props.children
  }
}

export default ScrollMonitor
