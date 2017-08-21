import React from 'react'
import DOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import Image from '../image'
import createClass from 'create-react-class'

describe('Image Component', () => {
  test('sets its state to loaded when it finishes loading', () => {
    let component = TestUtils.renderIntoDocument(
      <Image src="/test.jpg" />
    )

    TestUtils.Simulate.load(DOM.findDOMNode(component))

    setTimeout(function() {
      expect(component.state).toHaveProperty('isLoaded', true)
    }, Image.ONLOAD)
  })

  test('adds an error class on failed images', () => {
    let component = TestUtils.renderIntoDocument(<Image src="fizz.jpg" />)

    TestUtils.Simulate.error(DOM.findDOMNode(component))

    expect(component.state).toHaveProperty('didFail', true)
  })

  test('resets its loaded state when a new src is received', () => {
    let ParentComponent = createClass({
      getInitialState() {
        return {
          url: 'foo.jpg'
        }
      },
      render() {
        return <Image ref="image" src={this.state.url} />
      }
    })

    let component = TestUtils.renderIntoDocument(<ParentComponent />)
    let image = component.refs.image

    expect(image.props.src).toBe('foo.jpg')
    expect(image.state.isLoaded).toBe(false)

    component.setState({
      isLoaded: true,
      url: 'bar.jpg'
    })

    expect(image.props.src).toBe('bar.jpg')
    expect(image.state.isLoaded).toBe(false)
  })
})
