import ArsArsenal from '../index'
import Ars        from '../components/ars'
import React      from 'react'

let Test = React.addons.TestUtils

describe('ArsArsenal', function() {

  it ('exposes a component definition', function() {
    ArsArsenal.should.have.property('component', Ars)
  })

  it ('exposes a render method', function() {
    let component = ArsArsenal.render(document.body, {
      url: '/base/test/test.json'
    })

    Test.isElementOfType(component, Ars).should.equal(true)
  })

})
