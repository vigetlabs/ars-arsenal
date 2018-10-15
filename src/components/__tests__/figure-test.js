import React from 'react'
import { mount } from 'enzyme'
import Figure from '../figure'

describe('Figure Component', () => {
  let record = { id: 0, url: '/test.jpg' }

  test('executes a callback that passes the record id when clicked', () => {
    let callback = jest.fn()
    let component = mount(<Figure record={record} onClick={callback} />)

    component.simulate('click')

    expect(callback).toHaveBeenCalled()
  })
})
