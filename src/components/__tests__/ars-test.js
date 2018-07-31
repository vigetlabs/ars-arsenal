import React from 'react'
import Ars from '../ars'
import { mount } from 'enzyme'

describe('Ars', () => {
  describe('when the component renders', () => {
    let component = null

    beforeEach(() => {
      component = mount(<Ars url="/test.json" picked={9} />)
    })

    test('has a selection component', () => {
      expect(component.find('Selection')).toHaveLength(1)
    })

    test('migrates a single `picked` value to an array', () => {
      expect(component).toHaveState('picked', [9])
    })
  })

  describe('when rootAttributes is provided', () => {
    test('can be given a root attribute', () => {
      const rootAttributes = {
        'data-test': 'ars-resource-photo',
        className: 'my-custom-class'
      }
      let component = mount(
        <Ars url="/test.json" rootAttributes={rootAttributes} />
      )
      let htmlNode = component.find('.my-custom-class')

      expect(htmlNode.prop('data-test')).toBe('ars-resource-photo')
    })
  })

  describe('when the component renders with the multiselect option', () => {
    let component, onChange

    beforeEach(function() {
      onChange = jest.fn()
      component = mount(
        <Ars url="/test.json" onChange={onChange} multiselect={true} />
      )
    })

    test('has a multiselection component', () => {
      expect(component.find('MultiSelection').exists()).toBe(true)
    })

    describe('and a gallery item is picked', () => {
      beforeEach(function() {
        component.instance()._onGalleryPicked([9, 12])
      })

      test('sets the `picked` state to an array of chosen values', () => {
        expect(component).toHaveState('picked', [9, 12])
      })

      test('calls the onChange event with the picked state', () => {
        expect(onChange).toHaveBeenCalledWith(component.state('picked'))
      })
    })
  })

  describe('when a gallery item is picked', () => {
    describe('and an onChange handler is provided', () => {
      let component, onChange, picked

      beforeEach(function() {
        onChange = jest.fn()
        component = mount(<Ars url="/test.json" onChange={onChange} />)
        picked = [9]

        component.instance()._onGalleryPicked(picked)
      })

      test('sets the `picked` state to an array of chosen values', () => {
        expect(component).toHaveState('picked', picked)
      })

      test('calls the onChange event with the first item in the picked state', () => {
        expect(onChange).toHaveBeenCalledWith(9)
      })
    })

    describe('and an onChange handler is not provided', () => {
      let component = null

      beforeEach(() => {
        component = mount(<Ars url="/test.json" />)
        component.instance()._onGalleryPicked('slug')
      })

      test('sets the `picked` state to the chosen slug', () => {
        expect(component).toHaveState('picked', 'slug')
      })
    })
  })

  describe("when the component's selection button is clicked", () => {
    test('should set the dialogOpen state to true', () => {
      let component = mount(<Ars url="/test.json" />)

      component.find('Selection button').simulate('click')

      expect(component).toHaveState('dialogOpen', true)
    })
  })

  describe("when the component's multiselection button is clicked", () => {
    let component

    beforeEach(() => {
      component = mount(<Ars url="/test.json" multiselect={true} />)
      component.find('MultiSelection button').simulate('click')
    })

    test('should set the dialogOpen state to true', () => {
      expect(component).toHaveState('dialogOpen', true)
    })
  })

  describe("when the component's dialogOpen state is true", () => {
    let component = null

    beforeEach(() => {
      component = mount(<Ars url="/test.json" />)
      component.setState({ dialogOpen: true })
    })

    test('renders a picker component', () => {
      expect(component.find('Picker').exists()).toBe(true)
    })

    describe('when the picker exits', () => {
      beforeEach(() => {
        component.instance()._onExit()
      })

      test('sets the dialogOpen state to false', () => {
        expect(component).toHaveState('dialogOpen', false)
      })
    })
  })
})
