import React from 'react'
import Selection from '../selection'
import { mount } from 'enzyme'

jest.useFakeTimers()

describe('Selection', () => {
  test('renders a photo', () => {
    let component = mount(<Selection url="data" slug="1.json" />)

    jest.runAllTimers()
    component.update()

    expect(component.find('img').exists()).toBe(true)
  })

  test('does not render a photo', () => {
    let component = mount(<Selection url="data" />)

    jest.runAllTimers()
    component.update()

    expect(component.find('img').exists()).toBe(false)
  })
})
