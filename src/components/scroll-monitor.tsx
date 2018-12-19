import * as React from 'react'
import { findDOMNode } from 'react-dom'

interface Props {
  page: number
  onPage: (number: number) => void
}

class ScrollMonitor extends React.Component<Props, null> {
  teardown = () => {}
  lastChild: HTMLElement = null
  container: HTMLElement = null

  getElement(): HTMLElement {
    return findDOMNode(this) as HTMLElement
  }

  getScrollContainer(): HTMLElement {
    return this.getElement().querySelector('[data-scroll-container]')
  }

  getScrollTrigger(): HTMLElement | null {
    return this.getElement().querySelector('[data-scroll="true"]')
  }

  subscribe() {
    let element = this.getScrollContainer()

    if (element !== this.container) {
      this.container = element
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

    this.subscribe()
  }

  componentWillUnmount() {
    this.teardown()
  }

  check = () => {
    let endChild = this.getScrollTrigger()

    if (!endChild || endChild === this.lastChild) {
      return
    }

    // This value represents the lower fence a child element a child must
    // cross through to trigger a new page
    let lowerFence = this.container.scrollTop

    // Start by pushing the fence to the bottom of the container element
    // Then add the look ahead value; how far below the viewable window to
    // proactively fetch a new page.
    lowerFence += this.container.offsetHeight * 2

    // If the end child's offset in the container is less than the lower
    // fence, trigger pagination
    if (lowerFence > endChild.offsetTop) {
      this.lastChild = endChild
      this.props.onPage(this.props.page + 1)
    }
  }

  render() {
    return this.props.children
  }
}

export default ScrollMonitor
