(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERSION = undefined;

var _dom = require('./util/dom');

var _injectBaseStylesheet = require('./injectBaseStylesheet');

var _injectBaseStylesheet2 = _interopRequireDefault(_injectBaseStylesheet);

var _Trigger = require('./Trigger');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _ZoomPane = require('./ZoomPane');

var _ZoomPane2 = _interopRequireDefault(_ZoomPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VERSION = exports.VERSION = '0.1.0';

var Drift = (function () {
  function Drift(triggerEl) {
    var _this = this;

    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Drift);

    this.destroy = function () {
      _this._unbindEvents();
    };

    this.triggerEl = triggerEl;

    if (!(0, _dom.isDOMElement)(this.triggerEl)) {
      throw new TypeError('`new Drift` requires a DOM element as its first argument.');
    }

    // A bit unexpected if you haven't seen this pattern before.
    // Based on the pattern here:
    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
    var _options$namespace = options.namespace;
    var
    // Prefix for generated element class names (e.g. `my-ns` will
    // result in classes such as `my-ns-pane`. Default `drift-`
    // prefixed classes will always be added as well.
    namespace = _options$namespace === undefined ? null : _options$namespace;
    var _options$sourceAttrib = options.sourceAttribute;
    var
    // Which attribute to pull the ZoomPane image source from.
    sourceAttribute = _options$sourceAttrib === undefined ? 'data-zoom' : _options$sourceAttrib;
    var _options$paneContaine = options.paneContainer;
    var
    // A DOM element to append the non-inline ZoomPane to.
    // Required if `inlinePane !== true`.
    paneContainer = _options$paneContaine === undefined ? null : _options$paneContaine;
    var _options$inlinePane = options.inlinePane;
    var
    // When to switch to an inline ZoomPane. This can be a boolean or
    // an integer. If `true`, the ZoomPane will always be inline,
    // if `false`, it will switch to inline when `windowWidth <= inlinePane`
    inlinePane = _options$inlinePane === undefined ? 375 : _options$inlinePane;
    var _options$inlineContai = options.inlineContainer;
    var
    // The element to attach the inline ZoomPane to.
    inlineContainer = _options$inlineContai === undefined ? document.body : _options$inlineContai;
    var _options$onShow = options.onShow;
    var
    // If present (and a function), this will be called
    // whenever the ZoomPane is shown.
    onShow = _options$onShow === undefined ? null : _options$onShow;
    var _options$onHide = options.onHide;
    var
    // If present (and a function), this will be called
    // whenever the ZoomPane is hidden.
    onHide = _options$onHide === undefined ? null : _options$onHide;
    var _options$injectBaseSt = options.injectBaseStyles;
    var
    // Add base styles to the page. See the "Theming"
    // section of README.md for more information.
    injectBaseStyles = _options$injectBaseSt === undefined ? true : _options$injectBaseSt;

    if (inlinePane !== true && !(0, _dom.isDOMElement)(paneContainer)) {
      throw new TypeError('`paneContainer` must be a DOM element when `inlinePane !== true`');
    }

    this.settings = { namespace: namespace, sourceAttribute: sourceAttribute, paneContainer: paneContainer, inlinePane: inlinePane, inlineContainer: inlineContainer, onShow: onShow, onHide: onHide, injectBaseStyles: injectBaseStyles };

    if (this.settings.injectBaseStyles) {
      (0, _injectBaseStylesheet2.default)();
    }

    // this._bindEvents();
    this._buildZoomPane();
    this._buildTrigger();
  }

  _createClass(Drift, [{
    key: '_buildZoomPane',
    value: function _buildZoomPane() {
      this.zoomPane = new _ZoomPane2.default({
        container: this.settings.paneContainer,
        inlineContainer: this.settings.inlineContainer,
        inline: this.settings.inlinePane,
        namespace: this.settings.namespace
      });
    }
  }, {
    key: '_buildTrigger',
    value: function _buildTrigger() {
      this.trigger = new _Trigger2.default({
        el: this.triggerEl,
        zoomPane: this.zoomPane,
        onShow: this.settings.onShow,
        onHide: this.settings.onHide
      });
    }
  }, {
    key: 'isShowing',
    get: function get() {
      return this.zoomPane.isShowing;
    }
  }]);

  return Drift;
})();

exports.default = Drift;

global.Drift = Drift;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Trigger":2,"./ZoomPane":3,"./injectBaseStylesheet":4,"./util/dom":5}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _throwIfMissing = require('./util/throwIfMissing');

var _throwIfMissing2 = _interopRequireDefault(_throwIfMissing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trigger = (function () {
  function Trigger() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Trigger);

    _initialiseProps.call(this);

    var _options$el = options.el;
    var el = _options$el === undefined ? (0, _throwIfMissing2.default)() : _options$el;
    var _options$zoomPane = options.zoomPane;
    var zoomPane = _options$zoomPane === undefined ? (0, _throwIfMissing2.default)() : _options$zoomPane;
    var _options$onShow = options.onShow;
    var onShow = _options$onShow === undefined ? null : _options$onShow;
    var _options$onHide = options.onHide;
    var onHide = _options$onHide === undefined ? null : _options$onHide;

    this.settings = { el: el, zoomPane: zoomPane, onShow: onShow, onHide: onHide };

    this._bindEvents();
  }

  _createClass(Trigger, [{
    key: '_bindEvents',
    value: function _bindEvents() {
      this.settings.el.addEventListener('mouseenter', this._show, false);
      this.settings.el.addEventListener('mouseleave', this._hide, false);
    }
  }, {
    key: '_unbindEvents',
    value: function _unbindEvents() {
      this.settings.el.removeEventListener('mouseenter', this._show, false);
      this.settings.el.removeEventListener('mouseleave', this._hide, false);
    }
  }]);

  return Trigger;
})();

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this._show = function (e) {
    console.log('triggershow');
    e.preventDefault();

    var onShow = _this.settings.onShow;
    if (onShow && typeof onShow === 'function') {
      onShow();
    }

    _this.settings.zoomPane.show();
  };

  this._hide = function (e) {
    console.log('triggerhide');
    e.preventDefault();

    var onHide = _this.settings.onHide;
    if (onHide && typeof onHide === 'function') {
      onHide();
    }

    _this.settings.zoomPane.hide();
  };
};

exports.default = Trigger;

},{"./util/throwIfMissing":6}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _throwIfMissing = require('./util/throwIfMissing');

var _throwIfMissing2 = _interopRequireDefault(_throwIfMissing);

var _dom = require('./util/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// All officially-supported browsers have this, but it's easy to
// account for, just in case.
var HAS_ANIMATION = 'animation' in document.body.style;

var ZoomPane = (function () {
  function ZoomPane() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ZoomPane);

    this._completeShow = function () {
      _this.el.removeEventListener('animationend', _this._completeShow, false);

      _this.isShowing = true;

      (0, _dom.removeClasses)(_this.el, _this.openingClasses);
    };

    this._completeHide = function () {
      _this.el.removeEventListener('animationend', _this._completeHide, false);

      _this.isShowing = false;

      (0, _dom.removeClasses)(_this.el, _this.openClasses);
      (0, _dom.removeClasses)(_this.el, _this.closingClasses);
      (0, _dom.removeClasses)(_this.el, _this.inlineClasses);

      // The window could have been resized above or below `inline`
      // limits since the ZoomPane was shown. Because of this, we
      // can't rely on `this._isInline` here.
      if (_this.el.parentElement == _this.settings.container) {
        _this.settings.container.removeChild(_this.el);
      } else if (_this.el.parentElement == _this.settings.inlineContainer) {
        _this.settings.inlineContainer.removeChild(_this.el);
      }
    };

    this.isShowing = false;

    var _options$container = options.container;
    var container = _options$container === undefined ? null : _options$container;
    var _options$inlineContai = options.inlineContainer;
    var inlineContainer = _options$inlineContai === undefined ? (0, _throwIfMissing2.default)() : _options$inlineContai;
    var _options$inline = options.inline;
    var inline = _options$inline === undefined ? (0, _throwIfMissing2.default)() : _options$inline;
    var _options$namespace = options.namespace;
    var namespace = _options$namespace === undefined ? null : _options$namespace;

    this.settings = { container: container, inlineContainer: inlineContainer, inline: inline, namespace: namespace };

    this.openClasses = this._buildClasses('open');
    this.openingClasses = this._buildClasses('opening');
    this.closingClasses = this._buildClasses('closing');
    this.inlineClasses = this._buildClasses('inline');

    this._buildElement();
  }

  _createClass(ZoomPane, [{
    key: '_buildClasses',
    value: function _buildClasses(suffix) {
      var classes = ['drift-' + suffix];

      var ns = this.settings.namespace;
      if (ns) {
        classes.push(ns + '-' + suffix);
      }

      return classes;
    }
  }, {
    key: '_buildElement',
    value: function _buildElement() {
      this.el = document.createElement('div');
      (0, _dom.addClasses)(this.el, this._buildClasses('zoom-pane'));
    }
  }, {
    key: 'show',
    value: function show() {
      (0, _dom.addClasses)(this.el, this.openClasses);

      if (this._isInline) {
        this._showInline();
      } else {
        this._showInContainer();
      }

      if (HAS_ANIMATION) {
        this.el.addEventListener('animationend', this._completeShow, false);
        (0, _dom.addClasses)(this.el, this.openingClasses);
      }
    }
  }, {
    key: '_showInline',
    value: function _showInline() {
      this.settings.inlineContainer.appendChild(this.el);
      (0, _dom.addClasses)(this.el, this.inlineClasses);
    }
  }, {
    key: '_showInContainer',
    value: function _showInContainer() {
      this.settings.container.appendChild(this.el);
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (HAS_ANIMATION) {
        this.el.addEventListener('animationend', this._completeHide, false);
        (0, _dom.addClasses)(this.el, this.closingClasses);
      } else {
        (0, _dom.removeClasses)(this.el, this.openClasses);
      }
    }
  }, {
    key: '_isInline',
    get: function get() {
      var inline = this.settings.inline;

      return inline === true || typeof inline === 'number' && window.innerWidth <= inline;
    }
  }]);

  return ZoomPane;
})();

exports.default = ZoomPane;

},{"./util/dom":5,"./util/throwIfMissing":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectBaseStylesheet;
var RULES = '\n@keyframes noop {  }\n\n.drift-zoom-pane.drift-open {\n  display: block;\n}\n\n.drift-zoom-pane.drift-opening, .drift-zoom-pane.drift-closing {\n  animation: noop;\n}\n';

function injectBaseStylesheet() {
  if (document.querySelector('.drift-base-styles')) {
    return;
  }

  var styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.classList.add('drift-base-styles');

  styleEl.appendChild(document.createTextNode(RULES));

  var head = document.head;
  head.insertBefore(styleEl, head.firstChild);
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDOMElement = isDOMElement;
exports.addClasses = addClasses;
exports.removeClasses = removeClasses;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// This is not really a perfect check, but works fine.
// From http://stackoverflow.com/questions/384286
var hasDOM2 = (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object';

function isDOMElement(obj) {
  return hasDOM2 ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}

function addClasses(el, classNames) {
  classNames.forEach(function (className) {
    el.classList.add(className);
  });
}

function removeClasses(el, classNames) {
  classNames.forEach(function (className) {
    el.classList.remove(className);
  });
}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throwIfMissing;
function throwIfMissing() {
  throw new Error('Missing parameter');
}

},{}]},{},[1]);