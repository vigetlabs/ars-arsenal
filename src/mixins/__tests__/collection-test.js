import Collection from '../collection'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import createClass from 'create-react-class'

describe('Collection Mixin', () => {
  function makeComponent() {
    return createClass({
      displayName: 'CollectionTest',
      mixins: [Collection],
      render: () => <p />
    })
  }

  describe('responseDidSucceed', () => {
    let Component = makeComponent()
    let onFetch = jest.fn()

    test('calls onFetch when a response succeeds', () => {
      let component = TestUtils.renderIntoDocument(
        <Component url="/test.json" onFetch={onFetch} />
      )

      component.responseDidSucceed('body')

      expect(onFetch).toHaveBeenCalledWith('body')
    })

    test('sets the error state to false', () => {
      let component = TestUtils.renderIntoDocument(
        <Component url="/test.json" onFetch={onFetch} />
      )

      component.responseDidSucceed()

      expect(component.state.error).toBe(false)
    })

    test('sets the items state to the returned value of onFetch', () => {
      let onFetch = () => 'fetched'
      let component = TestUtils.renderIntoDocument(
        <Component url="/test.json" onFetch={onFetch} />
      )

      component.responseDidSucceed()

      expect(component.state).toHaveProperty('items', 'fetched')
    })
  })

  describe('responseDidFail', () => {
    let Component = makeComponent()

    test('sets the error state to the returned value of onError', () => {
      let onError = response => `${response} error!`
      let component = TestUtils.renderIntoDocument(
        <Component url="/test.json" onError={onError} />
      )

      component.responseDidFail('terrible')

      expect(component.state).toHaveProperty('error', 'terrible error!')
    })
  })
})
