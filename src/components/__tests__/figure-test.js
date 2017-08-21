import React from 'react'
import DOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import Figure from '../figure'

describe('Figure Component', () => {
  let record = { id: 0, url: '/base/test/test.jpg' }

  test('executes a callback that passes the record id when clicked', () => {
    let callback = jest.fn()
    let component = TestUtils.renderIntoDocument(
      <Figure record={record} onClick={callback} />
    )

    TestUtils.Simulate.click(DOM.findDOMNode(component))

    expect(callback).toHaveBeenCalled()
  })
})
