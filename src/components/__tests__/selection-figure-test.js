import React from 'react'
import SelectionFigure from '../selection-figure'
import { mount } from 'enzyme'

describe('SelectionFigure', () => {
  describe('when given a name', () => {
    test('renders a title', () => {
      let component = mount(<SelectionFigure item={{ name: 'Ars' }} />)

      expect(component.find('.ars-selection-title').text()).toContain('Ars')
    })
  })

  describe('when not given a name', () => {
    test('handles null', () => {
      let component = mount(<SelectionFigure item={{ title: null }} />)

      expect(component.find('.ars-selection-title').exists()).toBe(false)
    })

    test('handles undefined', () => {
      let component = mount(<SelectionFigure item={{}} />)

      expect(component.find('.ars-selection-title').exists()).toBe(false)
    })
  })

  describe('when given a caption', () => {
    test('renders a caption', () => {
      let component = mount(<SelectionFigure item={{ caption: 'Ars' }} />)

      expect(component.find('.ars-selection-caption').text()).toContain('Ars')
    })
  })

  describe('when not given a caption', () => {
    test('handles null', () => {
      let component = mount(<SelectionFigure item={{ caption: null }} />)

      expect(component.find('.ars-selection-caption').exists()).toBe(false)
    })

    test('handles undefined', () => {
      let component = mount(<SelectionFigure item={{}} />)

      expect(component.find('.ars-selection-caption').exists()).toBe(false)
    })
  })
})
