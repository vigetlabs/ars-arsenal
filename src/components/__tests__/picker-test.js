import React from 'react'
import DOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import Picker from '../picker'

function makePicker(props = {}) {
  props.onExit = props.onExit || (() => {})
  props.onChange = props.onChange || (() => {})

  return <Picker url="test.json" {...props} />
}

describe('Picker', () => {
  describe("when a picker's search input is changed", () => {
    test('updates its search state', done => {
      let component = TestUtils.renderIntoDocument(makePicker())
      let search = DOM.findDOMNode(component.refs.search).querySelector('input')

      search.value = 'test'

      TestUtils.SimulateNative.change(search)

      setTimeout(function() {
        expect(component.state.search).toBe('test')
        done()
      }, 200)
    })
  })

  describe("when a picker's gallery has a selection", () => {
    let component

    beforeEach(function() {
      component = TestUtils.renderIntoDocument(makePicker())

      component.setState({
        items: [{ id: 0, caption: 'test', url: '/test.jpg' }]
      })

      TestUtils.Simulate.click(
        DOM.findDOMNode(component.refs.gallery).querySelector(
          '.ars-gallery-item:first-child button'
        )
      )
    })

    test('updates its picked state', () => {
      expect(component.state.picked).toEqual([0])
    })
  })

  describe("when a multiselect picker's gallery has a selection", () => {
    let clickGalleryItem, component

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        makePicker({ multiselect: true })
      )

      clickGalleryItem = function(index) {
        TestUtils.Simulate.click(
          DOM.findDOMNode(component.refs.gallery).querySelector(
            `.ars-gallery-item:nth-child(${index + 1}) button`
          )
        )
      }

      component.setState({
        items: [
          { id: 0, caption: 'test', url: '/test.jpg' },
          { id: 1, caption: 'test', url: '/test.jpg' }
        ]
      })
    })

    test('updates its picked state', () => {
      clickGalleryItem(0)
      expect(component.state.picked).toEqual([0])
    })

    test('adds to its picked state', () => {
      clickGalleryItem(0)
      clickGalleryItem(1)
      expect(component.state.picked).toEqual([0, 1])
    })

    test('removes its picked state', () => {
      clickGalleryItem(0)
      clickGalleryItem(1)
      clickGalleryItem(1)
      expect(component.state.picked).toEqual([0])
    })
  })

  describe("when a picker's clear selection button is clicked", () => {
    let component = TestUtils.renderIntoDocument(makePicker())

    component.setState({
      items: [{ id: 0, caption: 'test', url: '/test.jpg' }],
      picked: [0]
    })

    test('clears its picked state', () => {
      TestUtils.Simulate.click(DOM.findDOMNode(component.refs.clear))
      expect(component.state.picked).toEqual([])
    })
  })

  describe("when a picker's confirm button is clicked", () => {
    let component, onChange, onExit

    beforeEach(function() {
      onExit = jest.fn()
      onChange = jest.fn()
      component = TestUtils.renderIntoDocument(makePicker({ onExit, onChange }))

      TestUtils.Simulate.click(DOM.findDOMNode(component.refs.confirm))
    })

    test('triggers the exit callback', () => {
      expect(onExit).toHaveBeenCalled()
    })

    test('triggers the onChange callback', () => {
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe("when a picker's cancel button is clicked", () => {
    let component, onChange, onExit

    beforeEach(function() {
      onExit = jest.fn()
      onChange = jest.fn()
      component = TestUtils.renderIntoDocument(makePicker({ onExit, onChange }))

      TestUtils.Simulate.click(DOM.findDOMNode(component.refs.cancel))
    })

    test('triggers the exit callback', () => {
      expect(onExit).toHaveBeenCalled()
    })

    test('does not trigger the onChange callback', () => {
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('when a user pushes a key sequence in the gallery', () => {
    describe('and it is cmd+enter', () => {
      let component, onChange, onExit

      beforeEach(function() {
        onExit = jest.fn()
        onChange = jest.fn()
        component = TestUtils.renderIntoDocument(
          makePicker({ onExit, onChange })
        )

        component.setState({
          items: [{ id: 0, caption: 'test', url: '/test.jpg' }]
        })

        TestUtils.Simulate.keyDown(DOM.findDOMNode(component.refs.gallery), {
          key: 'Enter',
          metaKey: true
        })
      })

      test('triggers the exit callback', () => {
        expect(onExit).toHaveBeenCalled()
      })

      test('trigger the onChange callback', () => {
        expect(onChange).toHaveBeenCalled()
      })
    })

    describe('and it is ctrl+enter', () => {
      let component, onChange, onExit

      beforeEach(function() {
        onExit = jest.fn()
        onChange = jest.fn()

        component = TestUtils.renderIntoDocument(
          makePicker({ onExit, onChange })
        )

        component.setState({
          items: [{ id: 0, caption: 'test', url: '/test.jpg' }]
        })

        TestUtils.Simulate.keyDown(DOM.findDOMNode(component.refs.gallery), {
          key: 'Enter',
          ctrlKey: true
        })
      })

      test('triggers the exit callback', () => {
        expect(onExit).toHaveBeenCalled()
      })

      test('trigger the onChange callback', () => {
        expect(onChange).toHaveBeenCalled()
      })
    })

    describe('and it does not include an option key', () => {
      let component, onChange, onExit

      beforeEach(function() {
        onExit = jest.fn()
        onChange = jest.fn()
        component = TestUtils.renderIntoDocument(
          makePicker({ onExit, onChange })
        )

        component.setState({
          items: [{ id: 0, caption: 'test', url: '/test.jpg' }]
        })

        TestUtils.Simulate.keyDown(DOM.findDOMNode(component.refs.gallery), {
          key: 'Enter'
        })
      })

      test('does not trigger the exit callback', () => {
        expect(onExit).not.toHaveBeenCalled()
      })

      test('does not trigger the onChange callback', () => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    describe('when given an error', () => {
      let component

      beforeAll(function(done) {
        component = TestUtils.renderIntoDocument(makePicker())
        component.setState({ error: 'This is a test error' }, () => done())
      })

      test('displays the error', () => {
        expect(
          DOM.findDOMNode(component).querySelector('.ars-error').textContent
        ).toBe('This is a test error')
      })
    })
  })
})
