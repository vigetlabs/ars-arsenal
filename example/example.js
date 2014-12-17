var ArsArsenal = require('../build/js/ars-arsenal');

ArsArsenal.render(app, {

  url: 'photos.json',

  onChange: function(value) {
    console.log(value);
  }

});
