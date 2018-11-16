import React from 'react'
import Selection from '../selection'
import SelectionFigure from '../selection-figure'
import { mount } from 'enzyme'

jest.useFakeTimers()

describe('Selection', () => {
  test('renders a photo given a valid record id', () => {
    let component = mount(<Selection id="data/1.json" />)

    jest.runAllTimers()
    component.update()

    expect(component.find(SelectionFigure).exists()).toBe(true)
  })

  test('does not render a photo when props.id is falsey', () => {
    let component = mount(<Selection id="data/1.json" />)

    jest.runAllTimers()
    component.update()

    expect(component.find(SelectionFigure).exists()).toBe(true)

    component.setProps({ id: null })

    expect(component.find(SelectionFigure).exists()).toBe(false)
  })
})
