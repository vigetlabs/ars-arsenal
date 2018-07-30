import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import expect from 'expect'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('xhr', function() {
  return jest.fn(({ url }, callback) => {
    const { resolve } = require('path')

    let path = resolve('.', url)
    let body = {}
    let statusCode = 200

    try {
      body = require(path)
    } catch (x) {
      statusCode = 404
    }

    let timeout = setTimeout(() => {
      callback(null, { body, url, statusCode })
    })

    return {
      abort() {
        clearTimeout(timeout)
      }
    }
  })
})

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
