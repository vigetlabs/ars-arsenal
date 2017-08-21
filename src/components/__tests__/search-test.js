import React from 'react'
import DOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Search from '../search'

describe('Search', function() {
  it('triggers a blank search below 2 characters', function() {
    let callback = sinon.spy()
    let component = TestUtils.renderIntoDocument(<Search onChange={callback} />)

    TestUtils.Simulate.change(DOM.findDOMNode(component.refs.input))

    // remember the change callback is debounced
    setTimeout(function() {
      callback.should.have.been.calledWith('')
    }, Search.INTERVAL)
  })

  it('triggers the full term above 2 characters', function() {
    let callback = sinon.spy()
    let component = TestUtils.renderIntoDocument(<Search onChange={callback} />)
    let input = DOM.findDOMNode(component.refs.input)

    input.value = 'Large Enough'

    TestUtils.Simulate.change(input)

    // remember the change callback is debounced
    setTimeout(function() {
      callback.should.have.been.calledWith('Large Enough')
    }, Search.INTERVAL)
  })

  it('traps submit events and calls onChange', function() {
    let callback = sinon.spy()
    let component = TestUtils.renderIntoDocument(<Search onChange={callback} />)
    let input = DOM.findDOMNode(component.refs.input)

    input.value = 'Large Enough'

    TestUtils.Simulate.submit(DOM.findDOMNode(component))

    // remember the change callback is debounced
    setTimeout(function() {
      callback.should.have.been.calledWith('Large Enough')
    }, Search.INTERVAL)
  })

  it('clears search on escape', function() {
    let callback = sinon.spy()
    let component = TestUtils.renderIntoDocument(<Search onChange={callback} />)
    let input = DOM.findDOMNode(component.refs.input)

    input.value = 'Large Enough'

    TestUtils.Simulate.keyUp(input, { key: 'Escape' })

    // remember the change callback is debounced
    setTimeout(function() {
      callback.should.have.been.calledWith('')
    }, Search.INTERVAL)
  })
})
