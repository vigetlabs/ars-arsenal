import React from 'react'
import MultiSelectionItem from '../multiselection-item'
import Options from '../../contexts/options'
import { mount } from 'enzyme'

jest.useFakeTimers()

describe('MultiSelectionItem', () => {
  test('renders a photo', () => {
    let component = mount(
      <Options.Provider value={{ url: 'data' }}>
        <MultiSelectionItem id="1.json" />
      </Options.Provider>
    )

    jest.runAllTimers()

    expect(component.render().find('img')).toHaveLength(1)
  })

  test('renders empty', () => {
    let component = mount(
      <Options.Provider value={{ url: 'data' }}>
        <MultiSelectionItem />
      </Options.Provider>
    )

    jest.runAllTimers()

    expect(component.render().find('img')).toHaveLength(0)
  })
})
