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
    var pattern = new RegExp(query, 'i')

    return query ? items.filter(i => i.caption.match(pattern)) : items
  },

  find(items, id) {
    if (id == void 0) return null

    return items.find(i => i.id.toString() === id.toString())
  },

  datalist(items) {
    return items.map(i => i.caption)
  }

}

module.exports = Photo
