import React from 'react'
import TestUtils from 'react-dom/test-utils'
import DOM from 'react-dom'
import Ars from '../ars'

let makeComponent = function(props) {
  return <Ars url="/test.json" {...props} />
}

describe('Ars', () => {
  describe('when the component renders', () => {
    let onChange = jest.fn()
    let picked = 9
    let component = TestUtils.renderIntoDocument(
      makeComponent({ onChange, picked })
    )

    test('has a selection component', () => {
      expect(component.refs).toHaveProperty('selection')
    })

    test('migrates a single `picked` value to an array', () => {
      expect(component.state.picked).toEqual([picked])
    })
  })

  describe('when rootAttributes is provided', () => {
    let onChange = jest.fn()
    let picked = 9

    test('can be given a root attribute', () => {
      const rootAttributes = {
        'data-test': 'ars-resource-photo',
        className: 'my-custom-class'
      }
      let component = TestUtils.renderIntoDocument(
        makeComponent({ onChange, picked, rootAttributes })
      )
      const htmlNode = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'my-custom-class'
      )
      const testAttr = htmlNode.attributes['data-test'].value

      expect(testAttr).toEqual('ars-resource-photo')
    })
  })

  describe('when the component renders with the multiselect option', () => {
    let component, multiselect, onChange

    beforeEach(function() {
      onChange = jest.fn()
      multiselect = true
      component = TestUtils.renderIntoDocument(
        makeComponent({ onChange, multiselect })
      )
    })

    test('has a multiselection component', () => {
      expect(component.refs).toHaveProperty('multiselection')
    })

    describe('and a gallery item is picked', () => {
      beforeEach(function() {
        component._onGalleryPicked([9, 12])
      })

      test('sets the `picked` state to an array of chosen values', () => {
        expect(component.state.picked).toEqual([9, 12])
      })

      test('calls the onChange event with the picked state', () => {
        expect(onChange).toHaveBeenCalledWith(component.state.picked)
      })
    })
  })

  describe('when a gallery item is picked', () => {
    describe('and an onChange handler is provided', () => {
      let component, onChange, picked

      beforeEach(function() {
        onChange = jest.fn()
        component = TestUtils.renderIntoDocument(makeComponent({ onChange }))
        picked = [9]

        component._onGalleryPicked(picked)
      })

      test('sets the `picked` state to an array of chosen values', () => {
        expect(component.state.picked).toEqual(picked)
      })

      test('calls the onChange event with the first item in the picked state', () => {
        expect(onChange).toHaveBeenCalledWith(component.state.picked[0])
      })
    })

    describe('and an onChange handler is not provided', () => {
      let component = TestUtils.renderIntoDocument(makeComponent())

      component._onGalleryPicked('slug')

      test('sets the `picked` state to the chosen slug', () => {
        expect(component.state).toHaveProperty('picked', 'slug')
      })
    })
  })

  describe("when the component's selection button is clicked", () => {
    let component = TestUtils.renderIntoDocument(makeComponent())

    TestUtils.Simulate.click(
      DOM.findDOMNode(component.refs.selection.refs.button)
    )

    test('should set the dialogOpen state to true', () => {
      expect(component.state).toHaveProperty('dialogOpen', true)
    })
  })

  describe("when the component's multiselection button is clicked", () => {
    let multiselect = true
    let component = TestUtils.renderIntoDocument(makeComponent({ multiselect }))

    TestUtils.Simulate.click(
      DOM.findDOMNode(component.refs.multiselection.refs.button)
    )

    test('should set the dialogOpen state to true', () => {
      expect(component.state).toHaveProperty('dialogOpen', true)
    })
  })

  describe("when the component's dialogOpen state is true", () => {
    let component = TestUtils.renderIntoDocument(makeComponent())

    beforeEach(done => {
      component.setState({ dialogOpen: true }, () => done())
    })

    test('renders a picker component', () => {
      expect(component.refs).toHaveProperty('picker')
    })

    describe('when the picker exits', () => {
      var spy = jest.spyOn(component, 'setState')

      component._onExit()

      test('sets the dialogOpen state to false', () => {
        expect(spy).toHaveBeenCalledWith({ dialogOpen: false })
      })

      afterAll(function() {
        spy.restore()
      })
    })
  })
})
