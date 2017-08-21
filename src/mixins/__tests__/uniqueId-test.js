import React from 'react'
import TestUtils from 'react-addons-test-utils'
import createClass from 'create-react-class'
import UniqueId from '../uniqueId'

describe('UniqueId Mixin', function() {
  let Component = createClass({
    mixins: [UniqueId],
    render: () => <p />
  })

  it('sets the state of a component to a unique identifier', function() {
    let first = TestUtils.renderIntoDocument(<Component />)
    let second = TestUtils.renderIntoDocument(<Component />)

    first.state.id.should.not.equal(second.state.id)
  })
})
