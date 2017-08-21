import TestUtils from 'react-dom/test-utils'
import ArsArsenal from '../index'
import Ars from '../components/ars'

describe('ArsArsenal', () => {
  test('exposes a component definition', () => {
    expect(ArsArsenal).toHaveProperty('component', Ars)
  })

  test('exposes a render method', () => {
    let component = ArsArsenal.render(document.createElement('div'), {
      url: '/base/test/test.json'
    })

    expect(TestUtils.isElementOfType(component, Ars)).toBe(true)
  })
})
