import React from 'react'
import DOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Figure from '../figure'

describe('Figure Component', function() {
  let record = { id: 0, url: '/base/test/test.jpg' }

  it('executes a callback that passes the record id when clicked', function() {
    let callback = sinon.spy()
    let component = TestUtils.renderIntoDocument(
      <Figure record={record} onClick={callback} />
    )

    TestUtils.Simulate.click(DOM.findDOMNode(component))

    callback.should.have.been.called
  })
})
