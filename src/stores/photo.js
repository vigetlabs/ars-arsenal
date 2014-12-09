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
  },

  filter(items, query) {
    return query ? items.filter(i => i.caption.match(query)) : items
  },

  datalist(items) {
    return items.map(i => i.caption)
  }

}

module.exports = Photo
