import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Selection from '../selection'

describe('Selection', function() {
  describe('when given an item', function() {
    it('renders a photo', function() {
      let component = TestUtils.renderIntoDocument(
        <Selection url="/base/test/test.json" resource="Photo" />
      )

      component.setState({ item: { url: '/base/test/test.jpg' } })

      component.refs.should.have.property('photo')
    })
  })

  describe('when not given an item', function() {
    it('does not render a photo', function() {
      let component = TestUtils.renderIntoDocument(
        <Selection url="/base/test/test.json" resource="Photo" />
      )

      component.refs.should.not.have.property('photo')
    })
  })
})
