import React from 'react'
import Selection from '../selection'
import SelectionFigure from '../selection-figure'
import { mount } from 'enzyme'

jest.useFakeTimers()

describe('Selection', () => {
  test('renders a photo given a valid record slug', () => {
    let component = mount(<Selection slug="data/1.json" />)

    jest.runAllTimers()
    component.update()

    expect(component.find(SelectionFigure).exists()).toBe(true)
  })

  test('does not render a photo when props.slug is falsey', () => {
    let component = mount(<Selection slug="data/1.json" />)

    jest.runAllTimers()
    component.update()

    expect(component.find(SelectionFigure).exists()).toBe(true)

    component.setProps({ slug: null })

    expect(component.find(SelectionFigure).exists()).toBe(false)
  })
})
