import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import expect from 'expect'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('xhr')

expect.extend({
  toHaveState(wrapper, key, expected) {
    while (wrapper) {
      if (wrapper.instance() == null) {
        wrapper = wrapper.children().at(0)
      } else {
        break
      }
    }

    if (wrapper == null) {
      throw new Error('Enzyme wrapper has no backing instance.')
    }

    let actual = wrapper.instance().state[key]

    return {
      pass: this.equals(expected, actual),
      message: () => {
        return `Expected ${wrapper.name()} to have state ${this.utils.printReceived(
          expected
        )} for ${key}, instead got {}${this.utils.printReceived(actual)}`
      }
    }
  }
})
