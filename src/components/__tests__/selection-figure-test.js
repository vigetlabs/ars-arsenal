import React from 'react'
import TestUtils from 'react-dom/test-utils'
import SelectionFigure from '../selection-figure'

describe('SelectionFigure', () => {
  describe('when given a name', () => {
    test('renders a title', () => {
      let component = TestUtils.renderIntoDocument(
        <SelectionFigure item={{ name: 'Ars' }} />
      )

      expect(component.refs).toHaveProperty('title')
    })
  })

  describe('when not given a name', () => {
    test('handles null', () => {
      let component = TestUtils.renderIntoDocument(
        <SelectionFigure item={{ title: null }} />
      )

      expect(component.refs).not.toHaveProperty('title')
    })

    test('does not render a title', () => {
      let component = TestUtils.renderIntoDocument(
        <SelectionFigure item={{}} />
      )

      expect(component.refs).not.toHaveProperty('title')
    })
  })

  describe('when given a caption', () => {
    test('renders a caption', () => {
      let component = TestUtils.renderIntoDocument(
        <SelectionFigure item={{ caption: 'Ars' }} />
      )

      expect(component.refs).toHaveProperty('caption')
    })
  })

  describe('when not given a caption', () => {
    test('handles null', () => {
      let component = TestUtils.renderIntoDocument(
        <SelectionFigure item={{ caption: null }} />
      )

      expect(component.refs).not.toHaveProperty('caption')
    })

    test('does not render a caption', () => {
      let component = TestUtils.renderIntoDocument(
        <SelectionFigure item={{}} />
      )

      expect(component.refs).not.toHaveProperty('caption')
    })
  })
})
