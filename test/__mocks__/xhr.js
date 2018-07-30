module.exports = jest.fn((options, callback) => {
  let body = {}
  let path = '../' + options.url
  let statusCode = 200

  try {
    body = require(path)
  } catch (x) {
    statusCode = 404
  }

  let timeout = setTimeout(() => {
    callback(null, { body, url: options.url, statusCode }, body)
  })

  return {
    abort() {
      clearTimeout(timeout)
    }
  }
})
