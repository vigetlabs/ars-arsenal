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
  var query   = req.query.q;

  if (query) {
    var pattern = new RegExp('^' + escape(query), 'i');

    payload = photos.filter(function(photo) {
      return pattern.test(photo.caption);
    });
  }

  res.send(payload)
});

server.get('/photos/:id', function(req, res) {
  var pattern = new RegExp('^' + escape(req.params.id) + '$', 'i');

  var payload = photos.filter(function(photo) {
    return pattern.test(photo.id);
  });

  res.send(payload);
});

server.listen(7000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
