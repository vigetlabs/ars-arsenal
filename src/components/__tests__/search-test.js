import React from 'react'
import DOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import Search from '../search'

describe('Search', () => {
  test('triggers a blank search below 2 characters', () => {
    let callback = jest.fn()
    let component = TestUtils.renderIntoDocument(<Search onChange={callback} />)

    TestUtils.Simulate.change(DOM.findDOMNode(component.refs.input))

    // remember the change callback is debounced
    setTimeout(function() {
      expect(callback).have.been.calledWith('')
    }, Search.INTERVAL)
  })

  test('triggers the full term above 2 characters', () => {
    let callback = jest.fn()
    let component = TestUtils.renderIntoDocument(<Search onChange={callback} />)
    let input = DOM.findDOMNode(component.refs.input)

    input.value = 'Large Enough'

    TestUtils.Simulate.change(input)

    // remember the change callback is debounced
    setTimeout(function() {
      expect(callback).have.been.calledWith('Large Enough')
    }, Search.INTERVAL)
  })

  test('traps submit events and calls onChange', () => {
    let callback = jest.fn()
    let component = TestUtils.renderIntoDocument(<Search onChange={callback} />)
    let input = DOM.findDOMNode(component.refs.input)

    input.value = 'Large Enough'

    TestUtils.Simulate.submit(DOM.findDOMNode(component))

    // remember the change callback is debounced
    setTimeout(function() {
      expect(callback).have.been.calledWith('Large Enough')
    }, Search.INTERVAL)
  })

  test('clears search on escape', () => {
    let callback = jest.fn()
    let component = TestUtils.renderIntoDocument(<Search onChange={callback} />)
    let input = DOM.findDOMNode(component.refs.input)

    input.value = 'Large Enough'

    TestUtils.Simulate.keyUp(input, { key: 'Escape' })

    // remember the change callback is debounced
    setTimeout(function() {
      expect(callback).have.been.calledWith('')
    }, Search.INTERVAL)
  })
})
