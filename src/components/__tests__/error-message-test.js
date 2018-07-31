import React from 'react'
import ErrorMessage from '../error-message'
import { mount } from 'enzyme'

describe('ErrorMessage', () => {
  describe('when given an error string', () => {
    test('renders', () => {
      let component = mount(<ErrorMessage error="test" />)
      expect(component.text()).toBe('test')
    })
  })

  describe('when given an error instance', () => {
    test('renders', () => {
      let component = mount(<ErrorMessage error={new Error('test')} />)
      expect(component.text()).toBe('test')
    })
  })

  describe('when not given an error', () => {
    test('renders nothing', () => {
      let component = mount(<ErrorMessage />)
      expect(component.html()).toBe(null)
    })
  })
})
