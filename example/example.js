var React      = require('react/addons');
var ArsArsenal = require('../src/index');

ArsArsenal.render(app, {

  url: 'photos.json',

  onChange: function(value) {
    console.log(value);
  }

});
