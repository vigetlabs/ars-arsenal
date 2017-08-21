import Record from '../record'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import createClass from 'create-react-class'
import xhr from 'xhr'

describe('Record Mixin', () => {
  function makeComponent() {
    return createClass({
      displayName: 'RecordTest',
      mixins: [Record],
      render: () => <p />
    })
  }

  beforeEach(function() {
    xhr.mockReset()
  })

  describe('componentWillMount', () => {
    test('fetches on mount if given a slug', () => {
      let Component = makeComponent()

      TestUtils.renderIntoDocument(<Component url="/test.json" slug="test" />)

      expect(xhr).toHaveBeenCalled()
    })

    test('does not fetch on mount if no slug is provided', () => {
      let Component = makeComponent()

      TestUtils.renderIntoDocument(<Component url="/test.json" />)

      expect(xhr).not.toHaveBeenCalled()
    })

    test('fetches when the slug is 0', () => {
      let Component = makeComponent()

      TestUtils.renderIntoDocument(<Component url="/test.json" slug={0} />)

      expect(xhr).toHaveBeenCalled()
    })

    test('does not fetch on NaN', () => {
      let Component = makeComponent()

      TestUtils.renderIntoDocument(<Component url="/test.json" slug={NaN} />)

      expect(xhr).not.toHaveBeenCalled()
    })
  })

  describe('componentWillReceiveProps', () => {
    test('fetches when given a new slug', () => {
      let Component = makeComponent()

      let Parent = createClass({
        getInitialState() {
          return { slug: 'test' }
        },
        render() {
          return <Component url="/test.json" slug={this.state.slug} />
        }
      })

      let component = TestUtils.renderIntoDocument(<Parent />)

      component.setState({ slug: 'different-slug' })

      expect(xhr).toHaveBeenCalledTimes(2)
    })

    test('does not fetch when given the same slug', () => {
      let Component = makeComponent()

      let Parent = createClass({
        getInitialState() {
          return { slug: 'test' }
        },
        render() {
          return <Component url="/test.json" slug={this.state.slug} />
        }
      })

      let component = TestUtils.renderIntoDocument(<Parent />)

      component.setState({ slug: 'test' })

      expect(xhr).toHaveBeenCalledTimes(1)
    })
  })

  describe('responseDidSucceed', () => {
    let Component, onFetch

    beforeEach(function() {
      Component = makeComponent()
      onFetch = jest.fn()
    })

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

      expect(component.state).toHaveProperty('error', false)
    })

    test('sets the item state to the returned value of onFetch', () => {
      let onFetch = () => 'fetched'
      let component = TestUtils.renderIntoDocument(
        <Component url="/test.json" onFetch={onFetch} />
      )

      component.responseDidSucceed()

      expect(component.state).toHaveProperty('item', 'fetched')
    })
  })

  describe('responseDidFail', () => {
    let Component = makeComponent()

    test('sets the error state to the returned value of onError, and item to false', () => {
      let onError = response => `${response} error!`
      let component = TestUtils.renderIntoDocument(
        <Component url="/test.json" onError={onError} />
      )

      component.responseDidFail('terrible')

      expect(component.state).toHaveProperty('error', 'terrible error!')
      expect(component.state).toHaveProperty('item', false)
    })
  })
})
