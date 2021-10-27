"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function reducer(state, action) {
  if (action.type === "ADD_PROPERTY") {
    console.log(action);
    return Object.assign({}, state, {
      properties: [].concat(_toConsumableArray(state.properties), [{
        name: action.propName,
        id: action.propId,
        img: action.propImg,
        bedrooms: action.bedrooms,
        bathrooms: action.bathrooms,
        baseGuests: action.baseGuests
      }])
    });
  }

  return state;
}

var initialState = {
  properties: []
}; // preloadedState will be passed in by the plugin

var _default = function _default(preloadedState) {
  return (0, _redux.createStore)(reducer, initialState);
};

exports["default"] = _default;