import React from 'react'
import Selection from '../selection'
import Options from '../../contexts/options'
import { mount } from 'enzyme'

jest.useFakeTimers()

describe('Selection', () => {
  test('renders a photo', () => {
    let component = mount(
      <Options.Provider value={{ url: 'data' }}>
        <Selection url="data" slug="1.json" />
      </Options.Provider>
    )

    jest.runAllTimers()
    component.update()

    expect(component.find('img').exists()).toBe(true)
  })

  test('does not render a photo', () => {
    let component = mount(
      <Options.Provider value={{ url: 'data' }}>
        <Selection />
      </Options.Provider>
    )

    jest.runAllTimers()
    component.update()

    expect(component.find('img').exists()).toBe(false)
  })
})
