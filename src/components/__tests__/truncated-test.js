import React from 'react'
import Truncated from '../truncated'
import { mount } from 'enzyme'

describe('Truncated', () => {
  test('handles undefined values', () => {
    let component = mount(<Truncated />)
    expect(component.text()).toBe('')
  })

  test('handles numbers', () => {
    let component = mount(<Truncated text={1} />)
    expect(component.text()).toBe('1')
  })

  test('limits text', () => {
    let component = mount(<Truncated text="This will be truncated" limit={10} />)
    expect(component.text()).toBe('This will…')
  })

  test('does not add ellipsis to short text', () => {
    let component = mount(<Truncated text="Short" limit={20} />)
    expect(component.text()).toBe('Short')
  })
})
