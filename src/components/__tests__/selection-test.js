import React from 'react'
import TestUtils from 'react-dom/test-utils'
import Selection from '../selection'

describe('Selection', () => {
  describe('when given an item', () => {
    test('renders a photo', () => {
      let component = TestUtils.renderIntoDocument(
        <Selection url="/test.json" resource="Photo" />
      )

      component.setState({ item: { url: '/test.jpg' } })

      expect(component.refs).toHaveProperty('photo')
    })
  })

  describe('when not given an item', () => {
    test('does not render a photo', () => {
      let component = TestUtils.renderIntoDocument(
        <Selection url="/test.json" resource="Photo" />
      )

      expect(component.refs).not.toHaveProperty('photo')
    })
  })
})
