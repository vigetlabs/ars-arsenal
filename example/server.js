var restify = require('restify');
var photos  = require('./photos');
var server  = restify.createServer();

server.use(restify.queryParser());
server.use(restify.CORS());

server.use(function(req, res, next) {
  console.log("%s: %s ? %s", req.route.method, req.route.path, JSON.stringify(req.params));
  next();
});

server.get('/photos', function(req, res) {
  var payload = photos;
  var query   = req.query.term;

  if (query) {
    query = query.toLowerCase();

    payload = photos.filter(function(photo) {
      return photo.caption.toLowerCase().search(query) > -1;
    });
  }

  res.send(payload)
});

server.get('/photos/:id', function(req, res) {
  var pattern = new RegExp('^' + escape(req.params.id) + '$', 'i');

  var payload = photos.filter(function(photo) {
    return pattern.test(photo.id);
  })[0];

  setTimeout(function() {
    payload? res.send(payload) : res.error(404);
  }, 2000)
});

server.listen(7000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
