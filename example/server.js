var webpack = require('./webpack')
var api     = require('./api')

webpack.listen(8080, "localhost", function() {
  console.log("Server is listening on http://localhost:8080")
});

api.listen(7654, function() {
  console.log('API listening at http://localhost:7654');
});
