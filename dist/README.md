# Ars Arsenal

A gallery picker

---

[![Build Status](https://travis-ci.org/vigetlabs/ars-arsenal.png?branch=master)](https://travis-ci.org/vigetlabs/ars-arsenal)
[![Code Climate](https://codeclimate.com/github/vigetlabs/ars-arsenal/badges/gpa.svg)](https://codeclimate.com/github/vigetlabs/ars-arsenal)
[![Coverage Status](https://coveralls.io/repos/vigetlabs/ars-arsenal/badge.png?branch=master)](https://coveralls.io/r/vigetlabs/ars-arsenal?branch=master)

---

![Example](http://f.cl.ly/items/2Z442e3B3o2D2k1j410I/ars.gif)

## Usage

```javascript
import ArsArsenal from 'ars-arsenal'

let app = document.getElementById('app')

ArsArsenal.render(app, {

  url: 'photo/resource/endpoint',

  makeURL(url, id) {
    // define how the endpoint url is constructed
    if (id) {
      return url + "/" + id
    }

    return url
  },

  makeQuery(term) {
    // define how the search query string is built
    return "q=" + term
  },

  onError(response) {
    // format errors before they are sent as a "string" value
    // to the component
    return response.code + ": " + response.message
  },

  onFetch(response) {
    // format the response, useful if you do not control the JSON
    // response from your endpoint
    return data
  },

  onChange(id) {
    // Whenever a new item is picked, this event is triggered
    console.log("The value was changed to %s", id)
  }

})
```

### Response format

```json
[
  {
    "id": 1,
    "attribution": "League of Legends",
    "name": "Alistar",
    "caption": "Lorem ipsum dolor sit amet",
    "url": "images/alistar.jpg"
  },
  //...
]
```

See [example](https://github.com/vigetlabs/ars-arsenal/tree/master/example)!


## Contributing

### Setup

```bash
npm install -d
npm start
```
