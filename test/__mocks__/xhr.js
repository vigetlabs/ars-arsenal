const url = require('url')

module.exports = jest.fn((options, callback) => {
  let body = null
  let path = '../' + url.parse(options.url).pathname
  let statusCode = 200

  try {
    body = require(path)
  } catch (x) {
    body = 'Unable to load URL'
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
