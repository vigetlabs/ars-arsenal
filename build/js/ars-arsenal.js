module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Ars Arsenal
	 * A gallery picker
	 */
	
	/**
	 * All necessary polyfills
	 */
	
	__webpack_require__(/*! ./patch */ 2);
	
	
	/**
	 * Style information compiled via Webpack
	 */
	
	__webpack_require__(/*! style/ars-arsenal */ 8);
	
	var React = __webpack_require__(/*! react */ 1);
	var Ars = __webpack_require__(/*! ./components/ars */ 3);
	
	module.exports = {
	  component: Ars,
	  render: function (el, options) {
	    React.render(React.createElement(Ars, options), el);
	  }
	};

/***/ },
/* 1 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react");

/***/ },
/* 2 */
/*!**********************!*\
  !*** ./src/patch.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// Polyfill Object.assign for splat arguments
	if (!Object.assign) {
	  Object.assign = __webpack_require__(/*! object-assign */ 11);
	}
	
	// Polyfill Array.prototype.find for easy record retrieval
	__webpack_require__(/*! array.prototype.find */ 12);

/***/ },
/* 3 */
/*!*******************************!*\
  !*** ./src/components/ars.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Ars
	 * The main element for Ars Arsenal
	 */
	
	var Picker = __webpack_require__(/*! ./picker */ 4);
	var Photo = __webpack_require__(/*! ../stores/photo */ 6);
	var React = __webpack_require__(/*! react */ 1);
	var Selection = __webpack_require__(/*! ./selection */ 5);
	var Sync = __webpack_require__(/*! ../mixins/sync */ 7);
	var Types = React.PropTypes;
	
	var Ars = React.createClass({
	  displayName: "Ars",
	
	
	  mixins: [Sync],
	
	  propTypes: {
	    url: Types.string.isRequired,
	    onChange: Types.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onChange: function () {},
	      picked: null
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      dialogOpen: false,
	      picked: this.props.picked,
	      search: ""
	    };
	  },
	
	  getPicker: function getPicker() {
	    var error = this.state.error;
	    var items = this.state.items;
	    var search = this.state.search;
	    var picked = this.state.picked;
	
	
	    var allowed = Photo.filter(items, search);
	
	    return React.createElement(Picker, { error: error,
	      items: allowed,
	      key: "dialog",
	      onSearch: this._onSearchChange,
	      onChange: this._onGalleryPicked,
	      onExit: this._onExit,
	      picked: picked });
	  },
	
	  render: function render() {
	    var dialogOpen = this.state.dialogOpen;
	    var items = this.state.items;
	    var picked = this.state.picked;
	    var search = this.state.search;
	
	
	    var record = Photo.find(items, picked);
	
	    return React.createElement(
	      "div",
	      { className: "ars" },
	      React.createElement(Selection, { onClick: this._onOpenClick, photo: record }),
	      dialogOpen && this.getPicker()
	    );
	  },
	
	  _onOpenClick: function OnOpenClick() {
	    this.setState({ dialogOpen: true, search: null });
	  },
	
	  _onSearchChange: function OnSearchChange(search) {
	    this.setState({ search: search });
	  },
	
	  _onGalleryPicked: function OnGalleryPicked(picked) {
	    var _this = this;
	    this.setState({ picked: picked }, function () {
	      return _this.props.onChange(_this.state.picked);
	    });
	  },
	
	  _onExit: function OnExit() {
	    this.setState({ dialogOpen: false, search: null });
	  }
	
	});
	
	module.exports = Ars;

/***/ },
/* 4 */
/*!**********************************!*\
  !*** ./src/components/picker.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Picker
	 * The a modal that appears to select a gallery image
	 */
	
	var Button = __webpack_require__(/*! ./ui/button */ 15);
	var Dialog = __webpack_require__(/*! ./ui/dialog */ 16);
	var Gallery = __webpack_require__(/*! ./gallery */ 13);
	var React = __webpack_require__(/*! react */ 1);
	var Search = __webpack_require__(/*! ./search */ 14);
	var Types = React.PropTypes;
	
	var Picker = React.createClass({
	  displayName: "Picker",
	
	
	  propTypes: {
	    onChange: Types.func.isRequired,
	    onExit: Types.func.isRequired,
	    onSearch: Types.func.isRequired
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      items: [],
	      picked: false
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      picked: this.props.picked
	    };
	  },
	
	  confirm: function confirm() {
	    this.props.onChange(this.state.picked);
	    this.props.onExit();
	  },
	
	  cancel: function cancel() {
	    this.props.onExit();
	  },
	
	  getError: function getError() {
	    var error = this.props.error;
	
	    return error ? React.createElement(
	      "p",
	      { className: "ars-error" },
	      error
	    ) : null;
	  },
	
	  render: function render() {
	    var error = this.props.error;
	    var items = this.props.items;
	    var onSearch = this.props.onSearch;
	    var onChange = this.props.onChange;
	    var search = this.props.search;
	
	
	    return React.createElement(
	      Dialog,
	      { onExit: this.props.onExit },
	      React.createElement(
	        "header",
	        { className: "ars-dialog-header" },
	        React.createElement(
	          "h1",
	          { className: "ars-dialog-title" },
	          "Please select a photo"
	        ),
	        React.createElement(Search, { key: "search", onChange: onSearch })
	      ),
	      this.getError(),
	      React.createElement(Gallery, { items: items, picked: this.state.picked, onPicked: this._onPicked, onKeyDown: this._onKeyDown }),
	      React.createElement(
	        "footer",
	        { className: "ars-dialog-footer" },
	        React.createElement(
	          Button,
	          { onClick: this.props.onExit },
	          "Cancel"
	        ),
	        React.createElement(
	          Button,
	          { onClick: this._onConfirm, raised: true },
	          "Okay"
	        )
	      )
	    );
	  },
	
	  _onPicked: function OnPicked(picked) {
	    this.setState({ picked: picked });
	  },
	
	  _onCancel: function OnCancel(e) {
	    e.preventDefault();
	    this.cancel();
	  },
	
	  _onConfirm: function OnConfirm(e) {
	    e.preventDefault();
	    this.confirm();
	  },
	
	  _onKeyDown: function OnKeyDown(e) {
	    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
	      this.confirm();
	    }
	  }
	
	});
	
	module.exports = Picker;

/***/ },
/* 5 */
/*!*************************************!*\
  !*** ./src/components/selection.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(to5Runtime) {"use strict";
	
	/**
	 * Selection
	 */
	
	var Button = to5Runtime.interopRequire(__webpack_require__(/*! ./ui/button */ 15));
	
	var Image = to5Runtime.interopRequire(__webpack_require__(/*! ./ui/image */ 17));
	
	var React = to5Runtime.interopRequire(__webpack_require__(/*! react */ 1));
	
	var SHOULD_SELECT = "Select an image";
	var PICK_ANOTHER = "Choose another image";
	
	var Selection = React.createClass({
	  displayName: "Selection",
	
	
	  getPhoto: function getPhoto() {
	    var caption = this.props.photo.caption;
	    var url = this.props.photo.url;
	
	
	    return React.createElement(Image, { className: "ars-selection-photo", alt: caption, src: url });
	  },
	
	  render: function render() {
	    var hasPhoto = this.props.photo;
	
	    return React.createElement(
	      Button,
	      { className: "ars-selection", onClick: this._onClick },
	      hasPhoto && this.getPhoto(),
	      React.createElement(
	        "span",
	        { className: "ars-selection-caption" },
	        hasPhoto ? PICK_ANOTHER : SHOULD_SELECT
	      )
	    );
	  },
	
	  _onClick: function OnClick(e) {
	    e.preventDefault();
	    this.props.onClick(e);
	  }
	
	});
	
	module.exports = Selection;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"imports?global=>{}!exports-loader?global.to5Runtime!6to5/runtime\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 6 */
/*!*****************************!*\
  !*** ./src/stores/photo.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Photo
	 * The resource responsible for fetching and managing operations related to
	 * the API endpoint for images.
	 */
	
	var xhr = __webpack_require__(/*! xhr */ 22);
	
	var Photo = {
	
	  fetch: function fetch(url, success, error) {
	    var request = xhr({ url: url, json: true }, function (err, response, body) {
	      err ? error(err) : success(body);
	    });
	
	    return request;
	  },
	
	  filter: function filter(items, query) {
	    var pattern = new RegExp(query, "i");
	
	    return query ? items.filter(function (i) {
	      return i.caption.match(pattern);
	    }) : items;
	  },
	
	  find: function find(items, id) {
	    if (id == void 0) return null;
	
	    return items.find(function (i) {
	      return i.id.toString() === id.toString();
	    });
	  },
	
	  datalist: function datalist(items) {
	    return items.map(function (i) {
	      return i.caption;
	    });
	  }
	
	};
	
	module.exports = Photo;

/***/ },
/* 7 */
/*!****************************!*\
  !*** ./src/mixins/sync.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Sync Mixin
	 * Encapsulates data operations required for retrieving photos
	 */
	
	var Photo = __webpack_require__(/*! ../stores/photo */ 6);
	var Types = __webpack_require__(/*! react */ 1).PropTypes;
	
	module.exports = {
	
	  propTypes: {
	    onFetch: Types.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onFetch: function (data) {
	        return data;
	      }
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      items: [],
	      error: false
	    };
	  },
	
	  componentWillMount: function componentWillMount() {
	    Photo.fetch(this.props.url, this.responseDidSucceed, this.responseDidFail);
	  },
	
	  responseDidSucceed: function responseDidSucceed(raw) {
	    var items = this.props.onFetch(raw);
	
	    this.setState({ items: items, error: false });
	  },
	
	  responseDidFail: function responseDidFail(error) {
	    this.setState({ error: error });
	  }
	
	};

/***/ },
/* 8 */
/*!************************************!*\
  !*** ./src/style/ars-arsenal.scss ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */,
/* 10 */,
/* 11 */
/*!**********************************!*\
  !*** ./~/object-assign/index.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);
	
		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));
	
			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}
	
		return to;
	};


/***/ },
/* 12 */
/*!*****************************************!*\
  !*** ./~/array.prototype.find/index.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	// Array.prototype.find - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
	// For all details and docs: https://github.com/paulmillr/array.prototype.find
	// Fixes and tests supplied by Duncan Hall <http://duncanhall.net> 
	(function(globals){
	  if (Array.prototype.find) return;
	
	  var find = function(predicate) {
	    var list = Object(this);
	    var length = list.length < 0 ? 0 : list.length >>> 0; // ES.ToUint32;
	    if (length === 0) return undefined;
	    if (typeof predicate !== 'function' || Object.prototype.toString.call(predicate) !== '[object Function]') {
	      throw new TypeError('Array#find: predicate must be a function');
	    }
	    var thisArg = arguments[1];
	    for (var i = 0, value; i < length; i++) {
	      value = list[i];
	      if (predicate.call(thisArg, value, i, list)) return value;
	    }
	    return undefined;
	  };
	
	  if (Object.defineProperty) {
	    try {
	      Object.defineProperty(Array.prototype, 'find', {
	        value: find, configurable: true, enumerable: false, writable: true
	      });
	    } catch(e) {}
	  }
	
	  if (!Array.prototype.find) {
	    Array.prototype.find = find;
	  }
	})(this);


/***/ },
/* 13 */
/*!***********************************!*\
  !*** ./src/components/gallery.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Gallery
	 * Displays tiles of photos
	 */
	
	var React = __webpack_require__(/*! react/addons */ 19);
	var Animation = React.addons.CSSTransitionGroup;
	var Figure = __webpack_require__(/*! ./figure */ 20);
	var Types = React.PropTypes;
	
	var Gallery = React.createClass({
	  displayName: "Gallery",
	
	
	  propTypes: {
	    items: Types.array,
	    onPicked: Types.func.isRequired
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      items: [],
	      picked: false
	    };
	  },
	
	  getItem: function getItem(record) {
	    var isPicked = record.id === this.props.picked;
	
	    return React.createElement(Figure, { key: "photo_" + record.id, picked: isPicked, record: record, onClick: this.props.onPicked });
	  },
	
	  render: function render() {
	    return React.createElement(
	      Animation,
	      { component: "div", className: "ars-gallery", transitionName: "ars-fig", onKeyDown: this.props.onKeyDown },
	      this.props.items.map(this.getItem)
	    );
	  }
	
	});
	
	module.exports = Gallery;

/***/ },
/* 14 */
/*!**********************************!*\
  !*** ./src/components/search.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Search
	 */
	
	var React = __webpack_require__(/*! react */ 1);
	var Types = React.PropTypes;
	var UniqueID = __webpack_require__(/*! ../mixins/uniqueId */ 21);
	
	// The minimum number of characters before searching
	var THRESHOLD = 2;
	
	var Search = React.createClass({
	  displayName: "Search",
	
	
	  mixins: [UniqueID],
	
	  propTypes: {
	    onChange: Types.func.isRequired
	  },
	
	  render: function render() {
	    var id = "ars_search_" + this.state.id;
	
	    return React.createElement(
	      "div",
	      { className: "ars-search" },
	      React.createElement(
	        "label",
	        { className: "ars-search-label", htmlFor: id },
	        "Search"
	      ),
	      React.createElement("input", { id: id, ref: "input", type: "search", className: "ars-search-input", onChange: this._onChange, placeholder: "Search" })
	    );
	  },
	
	  _onChange: function OnChange(e) {
	    var query = this.refs.input.getDOMNode().value || "";
	    var result = query.length >= THRESHOLD ? query : "";
	
	    this.props.onChange(result);
	  }
	
	});
	
	module.exports = Search;

/***/ },
/* 15 */
/*!*************************************!*\
  !*** ./src/components/ui/button.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(to5Runtime) {"use strict";
	
	/**
	 * Button
	 */
	
	var React = __webpack_require__(/*! react/addons */ 19);
	var cx = React.addons.classSet;
	
	var Button = React.createClass({
	  displayName: "Button",
	
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      raised: false,
	      type: "button"
	    };
	  },
	
	  getClassName: function getClassName(base) {
	    var mods = cx({
	      "ars-button": true,
	      "ars-button-raised": this.props.raised
	    });
	
	    return cx(base, mods);
	  },
	
	  render: function render() {
	    var className = this.props.className;
	    var children = this.props.children;
	    var attrs = to5Runtime.objectWithoutProperties(this.props, ["className", "children"]);
	
	    return React.createElement(
	      "button",
	      React.__spread({ className: this.getClassName(className) }, attrs),
	      children
	    );
	  }
	
	});
	
	module.exports = Button;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"imports?global=>{}!exports-loader?global.to5Runtime!6to5/runtime\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 16 */
/*!*************************************!*\
  !*** ./src/components/ui/dialog.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Dialog
	 * A reuseable modal
	 */
	
	var Focus = __webpack_require__(/*! ../../mixins/focus */ 23);
	var React = __webpack_require__(/*! react */ 1);
	
	var Types = React.PropTypes;
	
	var Dialog = React.createClass({
	  displayName: "Dialog",
	
	
	  mixins: [Focus],
	
	  propTypes: {
	    onExit: Types.func.isRequired },
	
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "ars-dialog", tabIndex: "0", role: "dialog", onKeyUp: this._onKeyUp },
	      React.createElement("div", { className: "ars-dialog-blackout", "aria-hidden": true, onClick: this.props.onExit }),
	      React.createElement(
	        "section",
	        { className: "ars-dialog-inner" },
	        this.props.children
	      )
	    );
	  },
	
	  _onKeyUp: function OnKeyUp(e) {
	    if (e.key === "Escape") {
	      this.props.onExit();
	    }
	  }
	
	});
	
	module.exports = Dialog;

/***/ },
/* 17 */
/*!************************************!*\
  !*** ./src/components/ui/image.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(to5Runtime) {"use strict";
	
	/**
	 * Image
	 * A wrapper around image elements to handle loading states
	 * and transitions
	 */
	
	var React = to5Runtime.interopRequire(__webpack_require__(/*! react/addons */ 19));
	
	var cx = React.addons.classSet;
	
	var Image = React.createClass({
	  displayName: "Image",
	
	
	  getInitialState: function getInitialState() {
	    return {
	      isLoaded: false
	    };
	  },
	
	  getClassName: function getClassName(root) {
	    var base = cx("ars-img", root);
	    var states = cx({
	      "ars-img-loaded": this.state.isLoaded
	    });
	
	    return cx(base, states);
	  },
	
	  render: function render() {
	    var className = this.props.className;
	    var onLoad = this.props.onLoad;
	    var props = to5Runtime.objectWithoutProperties(this.props, ["className", "onLoad"]);
	
	    return React.createElement("img", React.__spread({ className: this.getClassName(className), onLoad: this._onLoad }, props));
	  },
	
	  _onLoad: function OnLoad() {
	    this.setState({ isLoaded: true });
	
	    if (this.props.onLoad) {
	      this.props.onLoad();
	    }
	  }
	
	});
	
	module.exports = Image;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"imports?global=>{}!exports-loader?global.to5Runtime!6to5/runtime\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 18 */,
/* 19 */
/*!*******************************!*\
  !*** external "react/addons" ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react/addons");

/***/ },
/* 20 */
/*!**********************************!*\
  !*** ./src/components/figure.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Figure
	 * An individual gallery tile
	 */
	
	var Image = __webpack_require__(/*! ./ui/image */ 17);
	var React = __webpack_require__(/*! react/addons */ 19);
	var Types = React.PropTypes;
	var cx = React.addons.classSet;
	
	var Figure = React.createClass({
	  displayName: "Figure",
	
	
	  propTypes: {
	    record: Types.object.isRequired,
	    onClick: Types.func.isRequired,
	    picked: Types.bool
	  },
	
	  render: function render() {
	    var record = this.props.record;
	    var picked = this.props.picked;
	
	
	    var className = cx({
	      "ars-fig": true,
	      "ars-fig-picked": picked
	    });
	
	    return React.createElement(
	      "button",
	      { className: className, onClick: this._onClick },
	      React.createElement(Image, { className: "ars-fig-img", src: record.url }),
	      React.createElement(
	        "span",
	        { className: "ars-fig-caption" },
	        record.caption
	      )
	    );
	  },
	
	  _onClick: function OnClick(e) {
	    e.preventDefault();
	    this.props.onClick(this.props.record.id);
	  }
	
	});
	
	module.exports = Figure;

/***/ },
/* 21 */
/*!********************************!*\
  !*** ./src/mixins/uniqueId.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * UniqueID
	 * Provides a unique identifier for components
	 */
	
	var _id = 0;
	
	module.exports = {
	
	  getInitialState: function getInitialState() {
	    return {
	      id: "c" + _id++
	    };
	  }
	
	};

/***/ },
/* 22 */
/*!************************!*\
  !*** ./~/xhr/index.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	var window = __webpack_require__(/*! global/window */ 24)
	var once = __webpack_require__(/*! once */ 25)
	var parseHeaders = __webpack_require__(/*! parse-headers */ 26)
	
	var messages = {
	    "0": "Internal XMLHttpRequest Error",
	    "4": "4xx Client Error",
	    "5": "5xx Server Error"
	}
	
	var XHR = window.XMLHttpRequest || noop
	var XDR = "withCredentials" in (new XHR()) ? XHR : window.XDomainRequest
	
	module.exports = createXHR
	
	function createXHR(options, callback) {
	    if (typeof options === "string") {
	        options = { uri: options }
	    }
	
	    options = options || {}
	    callback = once(callback)
	
	    var xhr = options.xhr || null
	
	    if (!xhr) {
	        if (options.cors || options.useXDR) {
	            xhr = new XDR()
	        }else{
	            xhr = new XHR()
	        }
	    }
	
	    var uri = xhr.url = options.uri || options.url
	    var method = xhr.method = options.method || "GET"
	    var body = options.body || options.data
	    var headers = xhr.headers = options.headers || {}
	    var sync = !!options.sync
	    var isJson = false
	    var key
	    var load = options.response ? loadResponse : loadXhr
	
	    if ("json" in options) {
	        isJson = true
	        headers["Accept"] = "application/json"
	        if (method !== "GET" && method !== "HEAD") {
	            headers["Content-Type"] = "application/json"
	            body = JSON.stringify(options.json)
	        }
	    }
	
	    xhr.onreadystatechange = readystatechange
	    xhr.onload = load
	    xhr.onerror = error
	    // IE9 must have onprogress be set to a unique function.
	    xhr.onprogress = function () {
	        // IE must die
	    }
	    // hate IE
	    xhr.ontimeout = noop
	    xhr.open(method, uri, !sync)
	                                    //backward compatibility
	    if (options.withCredentials || (options.cors && options.withCredentials !== false)) {
	        xhr.withCredentials = true
	    }
	
	    // Cannot set timeout with sync request
	    if (!sync) {
	        xhr.timeout = "timeout" in options ? options.timeout : 5000
	    }
	
	    if (xhr.setRequestHeader) {
	        for(key in headers){
	            if(headers.hasOwnProperty(key)){
	                xhr.setRequestHeader(key, headers[key])
	            }
	        }
	    } else if (options.headers) {
	        throw new Error("Headers cannot be set on an XDomainRequest object")
	    }
	
	    if ("responseType" in options) {
	        xhr.responseType = options.responseType
	    }
	    
	    if ("beforeSend" in options && 
	        typeof options.beforeSend === "function"
	    ) {
	        options.beforeSend(xhr)
	    }
	
	    xhr.send(body)
	
	    return xhr
	
	    function readystatechange() {
	        if (xhr.readyState === 4) {
	            load()
	        }
	    }
	
	    function getBody() {
	        // Chrome with requestType=blob throws errors arround when even testing access to responseText
	        var body = null
	
	        if (xhr.response) {
	            body = xhr.response
	        } else if (xhr.responseType === 'text' || !xhr.responseType) {
	            body = xhr.responseText || xhr.responseXML
	        }
	
	        if (isJson) {
	            try {
	                body = JSON.parse(body)
	            } catch (e) {}
	        }
	
	        return body
	    }
	
	    function getStatusCode() {
	        return xhr.status === 1223 ? 204 : xhr.status
	    }
	
	    // if we're getting a none-ok statusCode, build & return an error
	    function errorFromStatusCode(status) {
	        var error = null
	        if (status === 0 || (status >= 400 && status < 600)) {
	            var message = (typeof body === "string" ? body : false) ||
	                messages[String(status).charAt(0)]
	            error = new Error(message)
	            error.statusCode = status
	        }
	
	        return error
	    }
	
	    // will load the data & process the response in a special response object
	    function loadResponse() {
	        var status = getStatusCode()
	        var error = errorFromStatusCode(status)
	        var response = {
	            body: getBody(),
	            statusCode: status,
	            statusText: xhr.statusText,
	            raw: xhr
	        }
	        if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
	            response.headers = parseHeaders(xhr.getAllResponseHeaders())
	        } else {
	            response.headers = {}
	        }
	
	        callback(error, response, response.body)
	    }
	
	    // will load the data and add some response properties to the source xhr
	    // and then respond with that
	    function loadXhr() {
	        var status = getStatusCode()
	        var error = errorFromStatusCode(status)
	
	        xhr.status = xhr.statusCode = status
	        xhr.body = getBody()
	        xhr.headers = parseHeaders(xhr.getAllResponseHeaders())
	
	        callback(error, xhr, xhr.body)
	    }
	
	    function error(evt) {
	        callback(evt, xhr)
	    }
	}
	
	
	function noop() {}


/***/ },
/* 23 */
/*!*****************************!*\
  !*** ./src/mixins/focus.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Focus
	 *
	 * For accessibility, this mixin focuses on mount and returns focus
	 * when it is unmounted
	 */
	
	module.exports = {
	
	  _pushFocus: function PushFocus() {
	    this.setState({
	      previousFocus: document.activeElement
	    });
	
	    this.getDOMNode().focus();
	  },
	
	  _popFocus: function PopFocus() {
	    if (this.state.previousFocus) {
	      this.state.previousFocus.focus();
	      this._clearTrap();
	    }
	  },
	
	  // trap keyboard focus within modal
	  // via http://www.nczonline.net/blog/2013/02/12/making-an-accessible-dialog-box/
	  _trapFocus: function TrapFocus() {
	    var _this = this;
	    this._focusTimer = setTimeout(function (_) {
	      return _this.getDOMNode().focus();
	    }, 10);
	  },
	
	  _clearTrap: function () {
	    clearTimeout(this._focusTimer);
	  },
	
	  componentDidMount: function componentDidMount() {
	    var el = this.getDOMNode();
	
	    el.addEventListener("focusin", this._clearTrap);
	    el.addEventListener("focusout", this._trapFocus);
	
	    this._pushFocus();
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    var el = this.getDOMNode();
	
	    this._popFocus();
	
	    el.removeEventListener("focusin", this._clearTrap);
	    el.removeEventListener("focusout", this._trapFocus);
	  }
	
	};

/***/ },
/* 24 */
/*!**********************************!*\
  !*** ./~/xhr/~/global/window.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {if (typeof window !== "undefined") {
	    module.exports = window;
	} else if (typeof global !== "undefined") {
	    module.exports = global;
	} else if (typeof self !== "undefined"){
	    module.exports = self;
	} else {
	    module.exports = {};
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 25 */
/*!******************************!*\
  !*** ./~/xhr/~/once/once.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = once
	
	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  })
	})
	
	function once (fn) {
	  var called = false
	  return function () {
	    if (called) return
	    called = true
	    return fn.apply(this, arguments)
	  }
	}


/***/ },
/* 26 */
/*!************************************************!*\
  !*** ./~/xhr/~/parse-headers/parse-headers.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	var trim = __webpack_require__(/*! trim */ 27)
	  , forEach = __webpack_require__(/*! for-each */ 28)
	  , isArray = function(arg) {
	      return Object.prototype.toString.call(arg) === '[object Array]';
	    }
	
	module.exports = function (headers) {
	  if (!headers)
	    return {}
	
	  var result = {}
	
	  forEach(
	      trim(headers).split('\n')
	    , function (row) {
	        var index = row.indexOf(':')
	          , key = trim(row.slice(0, index)).toLowerCase()
	          , value = trim(row.slice(index + 1))
	
	        if (typeof(result[key]) === 'undefined') {
	          result[key] = value
	        } else if (isArray(result[key])) {
	          result[key].push(value)
	        } else {
	          result[key] = [ result[key], value ]
	        }
	      }
	  )
	
	  return result
	}

/***/ },
/* 27 */
/*!***********************************************!*\
  !*** ./~/xhr/~/parse-headers/~/trim/index.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	
	exports = module.exports = trim;
	
	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}
	
	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};
	
	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};


/***/ },
/* 28 */
/*!***************************************************!*\
  !*** ./~/xhr/~/parse-headers/~/for-each/index.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(/*! is-function */ 29)
	
	module.exports = forEach
	
	var toString = Object.prototype.toString
	var hasOwnProperty = Object.prototype.hasOwnProperty
	
	function forEach(list, iterator, context) {
	    if (!isFunction(iterator)) {
	        throw new TypeError('iterator must be a function')
	    }
	
	    if (arguments.length < 3) {
	        context = this
	    }
	    
	    if (toString.call(list) === '[object Array]')
	        forEachArray(list, iterator, context)
	    else if (typeof list === 'string')
	        forEachString(list, iterator, context)
	    else
	        forEachObject(list, iterator, context)
	}
	
	function forEachArray(array, iterator, context) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            iterator.call(context, array[i], i, array)
	        }
	    }
	}
	
	function forEachString(string, iterator, context) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        iterator.call(context, string.charAt(i), i, string)
	    }
	}
	
	function forEachObject(object, iterator, context) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            iterator.call(context, object[k], k, object)
	        }
	    }
	}


/***/ },
/* 29 */
/*!*****************************************************************!*\
  !*** ./~/xhr/~/parse-headers/~/for-each/~/is-function/index.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = isFunction
	
	var toString = Object.prototype.toString
	
	function isFunction (fn) {
	  var string = toString.call(fn)
	  return string === '[object Function]' ||
	    (typeof fn === 'function' && string !== '[object RegExp]') ||
	    (typeof window !== 'undefined' &&
	     // IE8 and below
	     (fn === window.setTimeout ||
	      fn === window.alert ||
	      fn === window.confirm ||
	      fn === window.prompt))
	};


/***/ }
/******/ ])
//# sourceMappingURL=ars-arsenal.js.map