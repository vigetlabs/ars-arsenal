import React from 'react'
import DOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import MultiSelection from '../multiselection'

describe('MultiSelection', function() {
  describe('when given photos', function() {
    let component = TestUtils.renderIntoDocument(
      <MultiSelection
        slug={[0, 1]}
        url="/base/test/test.json"
        resource="Photo"
      />
    )

    it('renders photos', function() {
      DOM.findDOMNode(component).querySelector('.ars-multiselection-grid')
        .should.exist
    })
  })

  describe('when not given photos', function() {
    let component = TestUtils.renderIntoDocument(
      <MultiSelection slug={[]} url="/base/test/test.json" resource="Photo" />
    )

    it('does not render photos', function() {
      DOM.findDOMNode(component)
        .querySelector('.ars-multiselection-grid')
        .should.equal(null)
    })
  })
})
