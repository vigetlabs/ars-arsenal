import React from 'react'
import Search from '../search'
import { mount } from 'enzyme'

jest.useFakeTimers()

describe('Search', () => {
  test('triggers a blank search below 2 characters', () => {
    let callback = jest.fn()
    let component = mount(<Search onQuery={callback} onChange={jest.fn()} search="" />)

    component.find('input').simulate('change')

    jest.runAllTimers()

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('')
  })

  test('triggers the full term above 2 characters', () => {
    let callback = jest.fn()
    let component = mount(<Search onQuery={callback} onChange={jest.fn()} search="Large Enough" />)

    component
      .find('input')
      .simulate('change', { target: { value: 'Large Enough' } })

    jest.runAllTimers()

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('Large Enough')
  })

  test('traps submit events and calls onQuery', () => {
    let callback = jest.fn()
    let component = mount(<Search onQuery={callback} onChange={jest.fn()} search="Large Enough" />)

    component
      .find('input')
      .simulate('change', { target: { value: 'Large Enough' } })

    component.simulate('submit')

    jest.runAllTimers()

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('Large Enough')
  })

  test('clears search on escape', () => {
    let callback = jest.fn()
    let component = mount(<Search onQuery={callback} onChange={jest.fn()} search="" />)

    component.find('input').simulate('keyup', { key: 'Escape' })

    jest.runAllTimers()

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('')
  })
})
