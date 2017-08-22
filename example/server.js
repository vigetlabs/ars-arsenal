var webpack = require('./webpack')

webpack.listen(process.env.PORT || 8080, 'localhost', function() {
  console.log('Server is listening on http://localhost:8080')
})
