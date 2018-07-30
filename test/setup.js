import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import expect from 'expect'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('xhr')

expect.extend({
  toHaveState(wrapper, key, expected) {
    let actual = wrapper.state(key)

    return {
      pass: expected === actual,
      message: () => {
        return `Expected ${wrapper.name()} to have state ${this.utils.printReceived(
          expected
        )} for ${key}, instead got {}${this.utils.printReceived(actual)}`
      }
    }
  }
})
