# Ars Arsenal

A gallery picker.

**Heads up!** we recently made some breaking changes to configuration in version 3.0.0. See the [CHANGELOG](CHANGELOG.md) for more information.

---

[![CircleCI](https://circleci.com/gh/vigetlabs/ars-arsenal.svg?style=svg)](https://circleci.com/gh/vigetlabs/ars-arsenal)

---

![Example](http://f.cl.ly/items/2Z442e3B3o2D2k1j410I/ars.gif)

## Installation

```shell
npm install --save ars-arsenal
```

### Styles

Ars Arsenal ships with a stylesheet. The easiest way to include it is
by importing it from the node_modules folder:

```scss
/* Sass stylesheet: */
@import './node_modules/ars-arsenal/style/ars-arsenal.scss' /* or CSS: */
@import './node_modules/ars-arsenal/style.css';
```

### Icons

Copy over icons from `./example/public/icons` to your public directory.

## Usage

```javascript
var ArsArsenal = require('ars-arsenal')

var app = document.getElementById('app')

ArsArsenal.render(app, {
  resource: 'photo', // the noun used for selection, i.e. "Pick a photo"

  // Configure the root element's HTML attributes. default = {}
  rootAttributes: {
    className: 'my-custom-class another-custom-class',
    'data-test': 'my-integration-selector-helper'
  },

  // The base URL for API interaction
  url: 'photo/resource/endpoint',

  // How to display the items. Can be "table" or "gallery"
  mode: 'gallery',

  // What table columns to display, and in what order
  columns: ['id', 'name', 'caption', 'attribution', 'preview'],

  multiselect: false,

  listUrl: function(url) {
    // Used to build the URL that fetches lists of records.
    return url
  },

  listQuery: function({ search, page, sort }) {
    // Use this function to rename query parameters before building
    // the listUrl URL
    //
    // Any data returned from this function will be stringified into
    // query parameters
    return { search, page, sort }
  },

  showUrl: function(url, id: ID) {
    // Used to build the URL that fetches a single record
    return `${url}/${id}`
  },

  onError: function(response) {
    // format errors before they are sent as a "string" value
    // to the component
    return response.code + ': ' + response.message
  },

  onFetch: function(response) {
    // format the response, useful if you do not control the JSON
    // response from your endpoint
    return data
  },

  onChange: function(id) {
    // Whenever a new item is picked, this event is triggered
    console.log('The value was changed to %s', id)
  },

  request: function(url, callback) {
    // Behavior to configure networking. Return an XMLHTTPRequest
    return xhr(url, callback)
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
  }
  //...
]
```

### Sorting

To enable sorting, take advantage of the `sort` field passed into the
`listQuery` option. `listQuery` will automatically stringify the
returned object:

```javascript
function listQuery({ page, search, sort }) {
  // Assuming your API requires a call like:
  // /photos?page=1&q=Dogs&sortKey=breed
  return {
    page: page,
    q: search,
    sortKey: sort
  }
}
```

## Contributing

### Setup

```bash
npm install -d
npm start
```

---

<a href="http://code.viget.com">
  <img src="http://code.viget.com/github-banner.png" alt="Code At Viget">
</a>

Visit [code.viget.com](http://code.viget.com) to see more projects from [Viget.](https://viget.com)
