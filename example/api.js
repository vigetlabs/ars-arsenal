var photos = require('./photos')
var server = require('express')()

server.get('/photos', function(req, res) {
  var payload = photos
  var query = req.query.term

  if (query) {
    query = query.toLowerCase()

    payload = photos.filter(function(photo) {
      return photo.name.toLowerCase().search(query) > -1
    })
  }

  res.send(payload)
})

server.get('/photos/:id', function(req, res) {
  var pattern = new RegExp('^' + escape(req.params.id) + '$', 'i')

  var payload = photos.filter(function(photo) {
    return pattern.test(photo.id)
  })[0]

  payload ? res.send(payload) : res.error(404)
})

module.exports = server
