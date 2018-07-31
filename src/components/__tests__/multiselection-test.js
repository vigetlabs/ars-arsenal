import React from 'react'
import MultiSelection from '../multiselection'
import { mount } from 'enzyme'

describe('MultiSelection', () => {
  test('renders multiple selections', () => {
    let component = mount(<MultiSelection slug={[0, 1]} url="test.json" />)
    expect(component.find('.ars-multiselection-grid').exists()).toBe(true)
  })

  test('renders an empty state', () => {
    let component = mount(<MultiSelection slug={[]} url="test.json" />)

    expect(component.find('.ars-multiselection-grid').exists()).toBe(false)
  })
})
