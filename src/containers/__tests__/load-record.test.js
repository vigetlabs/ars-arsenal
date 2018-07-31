import React from 'react'
import xhr from 'xhr'
import LoadRecord from '../load-record'
import { mount } from 'enzyme'

jest.useFakeTimers()

describe('LoadRecord', () => {
  beforeEach(() => xhr.mockClear())

  describe('componentWillMount', () => {
    test('fetches on mount if given a slug', () => {
      mount(<LoadRecord url="/test.json" slug="test" />)
      expect(xhr).toHaveBeenCalled()
    })

    test('does not fetch on mount if no slug is provided', () => {
      mount(<LoadRecord url="/test.json" />)
      expect(xhr).not.toHaveBeenCalled()
    })

    test('fetches when the slug is 0', () => {
      mount(<LoadRecord url="/test.json" slug={0} />)
      expect(xhr).toHaveBeenCalled()
    })

    test('does not fetch on NaN', () => {
      mount(<LoadRecord url="/test.json" slug={NaN} />)
      expect(xhr).not.toHaveBeenCalled()
    })
  })

  describe('componentWillReceiveProps', () => {
    test('fetches when given a new slug', () => {
      let component = mount(<LoadRecord url="/test.json" slug="first" />)

      expect(xhr).toHaveBeenCalledTimes(1)
      component.setProps({ slug: 'second' })
      expect(xhr).toHaveBeenCalledTimes(2)
    })

    test('does not fetch when given the same slug', () => {
      let component = mount(<LoadRecord url="/test.json" slug="first" />)

      expect(xhr).toHaveBeenCalledTimes(1)
      component.setProps({ slug: 'first' })
      expect(xhr).toHaveBeenCalledTimes(1)
    })
  })

  describe('responseDidSucceed', () => {
    test('calls onFetch when a response succeeds', () => {
      let onFetch = jest.fn()
      let component = mount(
        <LoadRecord url="/data" slug="1.json" onFetch={onFetch} />
      )

      jest.runAllTimers()

      expect(onFetch).toHaveBeenCalledWith({
        url: '/base/test/test.jpg',
        caption: 'This is a test',
        id: 1
      })
    })

    test('sets the error state to false', () => {
      let component = mount(<LoadRecord url="/data" slug="1.json" />)

      jest.runAllTimers()

      expect(component).toHaveState('error', false)
    })

    test('sets the item state to the returned value of onFetch', () => {
      let onFetch = () => 'fetched'
      let component = mount(
        <LoadRecord url="/data" slug="1.json" onFetch={onFetch} />
      )

      jest.runAllTimers()

      expect(component).toHaveState('data', 'fetched')
    })
  })

  describe('responseDidFail', () => {
    test('sets the error state to the returned value of onError, and item to false', () => {
      let onError = response => `terrible error!`
      let component = mount(
        <LoadRecord url="/data" slug="missing.json" onError={onError} />
      )

      jest.runAllTimers()

      expect(component).toHaveState('error', 'terrible error!')
      expect(component).toHaveState('data', false)
    })
  })
})
