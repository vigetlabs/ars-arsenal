import React from 'react'
import MultiSelectionItem from '../multiselection-item'
import { mount } from 'enzyme'

jest.useFakeTimers()

describe('MultiSelectionItem', () => {
  test('renders a photo', () => {
    let component = mount(<MultiSelectionItem url="/data" slug="1.json" />)

    jest.runAllTimers()

    expect(component.render().find('img')).toHaveLength(1)
  })

  test('renders empty', () => {
    let component = mount(<MultiSelectionItem url="/test.json" />)

    jest.runAllTimers()

    expect(component.render().find('img')).toHaveLength(0)
  })
})
