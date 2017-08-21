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
