var ArsArsenal = require('../build/js/ars-arsenal');

console.log(ArsArsenal)

ArsArsenal.render(app, {

  url: 'photos.json',

  onChange: function(value) {
    console.log(value);
  }

});
