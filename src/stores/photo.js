/**
 * Photo
 * The resource responsible for fetching and managing operations related to
 * the API endpoint for images.
 */

var xhr = require('xhr')

var Photo = {

  fetch(url, success, error) {
    var request = xhr({ url, json: true }, function(err, response, body) {
      err ? error(err) : success(body)
    })

    return request
  }

}

module.exports = Photo
