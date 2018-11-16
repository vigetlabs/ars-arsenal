import React from 'react'
import xhr from 'xhr'
import LoadRecord from '../load-record'
import { mount } from 'enzyme'

jest.useFakeTimers()

describe('LoadRecord', () => {
  beforeEach(() => xhr.mockClear())

  describe('componentWillMount', () => {
    test('fetches on mount if given a id', () => {
      mount(<LoadRecord url="/test.json" id="test" />)
      expect(xhr).toHaveBeenCalled()
    })

    test('does not fetch on mount if no id is provided', () => {
      mount(<LoadRecord url="/test.json" />)
      expect(xhr).not.toHaveBeenCalled()
    })

    test('fetches when the id is 0', () => {
      mount(<LoadRecord url="/test.json" id={0} />)
      expect(xhr).toHaveBeenCalled()
    })

    test('does not fetch on NaN', () => {
      mount(<LoadRecord url="/test.json" id={NaN} />)
      expect(xhr).not.toHaveBeenCalled()
    })
  })

  describe('componentWillReceiveProps', () => {
    test('fetches when given a new id', () => {
      let component = mount(<LoadRecord url="/test.json" id="first" />)

      expect(xhr).toHaveBeenCalledTimes(1)
      component.setProps({ id: 'second' })
      expect(xhr).toHaveBeenCalledTimes(2)
    })

    test('does not fetch when given the same id', () => {
      let component = mount(<LoadRecord url="/test.json" id="first" />)

      expect(xhr).toHaveBeenCalledTimes(1)
      component.setProps({ id: 'first' })
      expect(xhr).toHaveBeenCalledTimes(1)
    })
  })

  describe('responseDidSucceed', () => {
    test('calls onFetch when a response succeeds', () => {
      let onFetch = jest.fn()

      mount(<LoadRecord url="/data" id="1.json" onFetch={onFetch} />)

      jest.runAllTimers()

      expect(onFetch).toHaveBeenCalledWith({
        url: '/base/test/test.jpg',
        caption: 'This is a test',
        id: 1
      })
    })

    test('sets the error state to false', () => {
      let component = mount(<LoadRecord url="/data" id="1.json" />)

      jest.runAllTimers()

      expect(component).toHaveState('error', null)
    })

    test('sets the item state to the returned value of onFetch', () => {
      let onFetch = () => 'fetched'
      let component = mount(
        <LoadRecord url="/data" id="1.json" onFetch={onFetch} />
      )

      jest.runAllTimers()

      expect(component).toHaveState('data', 'fetched')
    })
  })

  describe('responseDidFail', () => {
    test('sets the error state to the returned value of onError, and item to false', () => {
      let onError = () => 'terrible error!'
      let component = mount(
        <LoadRecord url="/data" id="missing.json" onError={onError} />
      )

      jest.runAllTimers()

      expect(component).toHaveState('error', 'terrible error!')
      expect(component).toHaveState('data', null)
    })
  })
})
