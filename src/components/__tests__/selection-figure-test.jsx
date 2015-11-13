import SelectionFigure from '../selection-figure'

describe('SelectionFigure', function() {

  describe('when given a name', function() {
    it ('renders a title', function() {
      let component = TestUtils.renderIntoDocument(<SelectionFigure item={ { name: 'Ars' } } />)

      component.refs.should.have.property('title')
    })
  })

  describe('when not given a name', function() {
    it ('does not render a title', function() {
      let component = TestUtils.renderIntoDocument(<SelectionFigure item={ {} } />)

      component.refs.should.not.have.property('title')
    })
  })

  describe('when given a caption', function() {
    it ('renders a caption', function() {
      let component = TestUtils.renderIntoDocument(<SelectionFigure item={ { caption: 'Ars' } } />)

      component.refs.should.have.property('caption')
    })
  })

  describe('when not given a caption', function() {
    it ('does not render a caption', function() {
      let component = TestUtils.renderIntoDocument(<SelectionFigure item={ {} } />)

      component.refs.should.not.have.property('caption')
    })
  })
})
