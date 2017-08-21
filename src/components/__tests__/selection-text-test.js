import React from 'react'
import DOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import SelectionText from '../selection-text'

let item = {}
let fetching = true
let isPlural = true

function makeComponent(props = {}) {
  props.resource = props.resource || 'Image'

  return <SelectionText {...props} />
}

describe('SelectionText', () => {
  describe('when the selection is empty', () => {
    let component = TestUtils.renderIntoDocument(makeComponent())

    test('has the correct text', () => {
      expect(DOM.findDOMNode(component).textContent).toBe('Pick an image')
    })
  })

  describe('when the selection is not empty', () => {
    let component = TestUtils.renderIntoDocument(makeComponent({ item }))

    test('has the correct text', () => {
      expect(DOM.findDOMNode(component).textContent).toBe(
        'Pick a different image'
      )
    })
  })

  describe('when the selection is loading', () => {
    let component = TestUtils.renderIntoDocument(makeComponent({ fetching }))

    test('has the correct text', () => {
      expect(DOM.findDOMNode(component).textContent).toBe('Loading image')
    })
  })

  describe('when the selection is empty and the resource is plural', () => {
    let component = TestUtils.renderIntoDocument(makeComponent({ isPlural }))

    test('has the correct text', () => {
      expect(DOM.findDOMNode(component).textContent).toBe('Pick images')
    })
  })

  describe('when the selection is not empty and the resource is plural', () => {
    let component = TestUtils.renderIntoDocument(
      makeComponent({ isPlural, item })
    )

    test('has the correct text', () => {
      expect(DOM.findDOMNode(component).textContent).toBe(
        'Pick different images'
      )
    })
  })
})
