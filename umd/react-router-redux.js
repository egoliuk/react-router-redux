(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-router')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-router'], factory) :
	(factory((global.ReactRouterRedux = global.ReactRouterRedux || {}),global.React,global.ReactRouter));
}(this, (function (exports,React,reactRouter) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
var LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

var initialState = {
  location: null
};

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */
function routerReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      type = _ref.type,
      payload = _ref.payload;

  if (type === LOCATION_CHANGE) {
    return _extends$1({}, state, { location: payload });
  }

  return state;
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConnectedRouter = function (_Component) {
  _inherits(ConnectedRouter, _Component);

  function ConnectedRouter() {
    _classCallCheck(this, ConnectedRouter);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ConnectedRouter.prototype.render = function render() {
    var _props = this.props,
        propsStore = _props.store,
        history = _props.history,
        children = _props.children,
        props = _objectWithoutProperties(_props, ['store', 'history', 'children']);

    var store = propsStore || this.context.store;

    return React__default.createElement(
      reactRouter.Router,
      _extends({}, props, { history: history }),
      React__default.createElement(reactRouter.Route, { render: function render(_ref) {
          var location = _ref.location;

          store.dispatch({
            type: LOCATION_CHANGE,
            payload: location
          });

          return children;
        } })
    );
  };

  return ConnectedRouter;
}(React.Component);

ConnectedRouter.propTypes = {
  store: React.PropTypes.object,
  history: React.PropTypes.object,
  children: React.PropTypes.node
};
ConnectedRouter.contextTypes = {
  store: React.PropTypes.object
};

/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */
var CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

function updateLocation(method) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return {
      type: CALL_HISTORY_METHOD,
      payload: { method: method, args: args }
    };
  };
}

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
var push = updateLocation('push');
var replace = updateLocation('replace');
var go = updateLocation('go');
var goBack = updateLocation('goBack');
var goForward = updateLocation('goForward');

var routerActions = { push: push, replace: replace, go: go, goBack: goBack, goForward: goForward };

/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
function routerMiddleware(history) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type !== CALL_HISTORY_METHOD) {
          return next(action);
        }

        var _action$payload = action.payload,
            method = _action$payload.method,
            args = _action$payload.args;

        history[method].apply(history, args);
      };
    };
  };
}

exports.ConnectedRouter = ConnectedRouter;
exports.routerMiddleware = routerMiddleware;
exports.LOCATION_CHANGE = LOCATION_CHANGE;
exports.routerReducer = routerReducer;
exports.CALL_HISTORY_METHOD = CALL_HISTORY_METHOD;
exports.push = push;
exports.replace = replace;
exports.go = go;
exports.goBack = goBack;
exports.goForward = goForward;
exports.routerActions = routerActions;

Object.defineProperty(exports, '__esModule', { value: true });

})));
