import React from 'react'
import Image from '../image'
import { mount } from 'enzyme'

describe('Image Component', () => {
  test('sets its state to loaded when it finishes loading', () => {
    let component = mount(<Image src="/test.jpg" />)

    component.simulate('load')

    expect(component).toHaveState('isLoaded', true)
  })

  test('adds an error class on failed images', () => {
    let component = mount(<Image src="fizz.jpg" />)

    component.simulate('error')

    expect(component).toHaveState('didFail', true)
  })

  test('resets its loaded state when a new src is received', () => {
    let component = mount(<Image src="/foo.jpg" />)

    component.setProps({ src: 'bar.jpg' })

    expect(component).toHaveState('isLoaded', false)
  })
})
