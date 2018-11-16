import React from 'react'
import MultiSelection from '../multiselection'
import Options from '../../contexts/options'
import { mount } from 'enzyme'

describe('MultiSelection', () => {
  test('renders multiple selections', () => {
    let component = mount(
      <Options.Provider value={{ url: 'test.json' }}>
        <MultiSelection ids={[0, 1]} />
      </Options.Provider>
    )

    expect(component.find('.ars-multiselection-grid').exists()).toBe(true)
  })

  test('renders an empty state', () => {
    let component = mount(
      <Options.Provider value={{ url: 'test.json' }}>
        <MultiSelection ids={[]} />
      </Options.Provider>
    )

    expect(component.find('.ars-multiselection-grid').exists()).toBe(false)
  })
})
