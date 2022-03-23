"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

function reducer(state, action) {
  var newObj = state.properties;
  var city = state.city;
  var propType = state.propType;

  if (action.type === "ADD_PROPERTY") {
    if (!newObj[action.propId]) {
      newObj[action.propId] = {
        name: action.propName,
        id: action.propId,
        img: action.propImg,
        bedrooms: action.bedrooms,
        bathrooms: action.bathrooms,
        baseGuests: action.baseGuests,
        city: action.city,
        rate: action.rate,
        currSymbol: action.currSymbol
      };
      return {
        properties: newObj
      };
    }
  }

  if (action.type === 'REMOVE_PROPERTY') {
    if (newObj[action.propId]) {
      delete newObj[action.propId];
      return {
        properties: newObj
      };
    }
  }

  if (action.type === 'SEARCH_PARAMETER') {
    return {
      properties: newObj,
      city: action.city || city,
      propType: action.propType || propType
    };
  }

  return state;
}

var initialState = {
  properties: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('state')) || {} : {},
  city: "",
  propType: ""
}; // preloadedState will be passed in by the plugin

var _default = function _default(preloadedState) {
  return (0, _redux.createStore)(reducer, initialState);
};

exports["default"] = _default;