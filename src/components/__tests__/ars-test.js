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
      let component = mount(<Ars url="/test.json" rootAttributes={rootAttributes} />)
      let htmlNode = component.find('.my-custom-class')

      expect(htmlNode.prop('data-test')).toBe('ars-resource-photo')
    })
  })

  describe('when the component renders with the multiselect option', () => {
    let component, onChange

    beforeEach(function() {
      onChange = jest.fn()
      component = mount(<Ars url="/test.json" onChange={onChange} multiselect={true} />)
    })

    test('has a multiselection component', () => {
      expect(component.find('MultiSelection').exists()).toBe(true)
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
  })

  test('warns about duplicate API responses', () => {
    let logger = jest.fn()

    let request = (_url, success, _error) => {
      success([{ id: 1 }, { id: 1 }])
      return { abort() {} }
    }

    let component = mount(<Ars url="/test.json" request={request} logger={logger} />)

    component.setState({ dialogOpen: true })

    expect(logger).toHaveBeenCalledWith(
      'error',
      expect.stringContaining('Duplicate records were returned from /test.json')
    )
  })
})
