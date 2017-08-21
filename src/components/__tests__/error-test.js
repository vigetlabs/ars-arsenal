import React from 'react'
import DOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import Error from '../error'

describe('Error', () => {
  describe('when given an error', () => {
    test('renders', () => {
      let component = TestUtils.renderIntoDocument(<Error error="test" />)
      expect(DOM.findDOMNode(component).textContent).toBe('test')
    })
  })

  describe('when not given an error', () => {
    test('renders nothing', () => {
      let component = TestUtils.renderIntoDocument(<Error />)
      expect(DOM.findDOMNode(component)).toBe(null)
    })
  })
})
