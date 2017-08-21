import React from 'react'
import DOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import MultiSelection from '../multiselection'

describe('MultiSelection', () => {
  describe('when given photos', () => {
    let component = TestUtils.renderIntoDocument(
      <MultiSelection
        slug={[0, 1]}
        url="/test.json"
        resource="Photo"
      />
    )

    test('renders photos', () => {
      expect(DOM.findDOMNode(component).querySelector('.ars-multiselection-grid')).toBeDefined()
    })
  })

  describe('when not given photos', () => {
    let component = TestUtils.renderIntoDocument(
      <MultiSelection slug={[]} url="/test.json" resource="Photo" />
    )

    test('does not render photos', () => {
      expect(DOM.findDOMNode(component)
        .querySelector('.ars-multiselection-grid')).toBe(null)
    })
  })
})
