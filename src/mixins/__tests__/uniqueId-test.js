import React from 'react'
import TestUtils from 'react-dom/test-utils'
import createClass from 'create-react-class'
import UniqueId from '../uniqueId'

describe('UniqueId Mixin', () => {
  let Component = createClass({
    mixins: [UniqueId],
    render: () => <p />
  })

  test('sets the state of a component to a unique identifier', () => {
    let first = TestUtils.renderIntoDocument(<Component />)
    let second = TestUtils.renderIntoDocument(<Component />)

    expect(first.state.id).not.toBe(second.state.id)
  })
})
