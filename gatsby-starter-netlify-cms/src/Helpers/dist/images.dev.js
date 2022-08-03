"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Helper functions.
var getBgImageType = function getBgImageType(imageData) {
  return imageData.layout === 'fixed' ? 'fixed' : 'fluid';
};

var getAspectRatio = function getAspectRatio(imageData) {
  return imageData.width / imageData.height;
};

var getPlaceholder = function getPlaceholder(imageData) {
  if (imageData.placeholder) {
    return imageData.placeholder.fallback.includes("base64") ? {
      base64: imageData.placeholder.fallback
    } : {
      tracedSvg: imageData.placeholder.fallback
    };
  }

  return {};
};

var convertToBgImage = function convertToBgImage(imageData) {
  if (imageData && imageData.layout) {
    var returnBgObject = {};
    var bgType = getBgImageType(imageData);
    var aspectRatio = getAspectRatio(imageData);
    var placeholder = getPlaceholder(imageData);
    returnBgObject[bgType] = _objectSpread({}, imageData.images.fallback, {}, placeholder, {
      aspectRatio: aspectRatio
    });
    return returnBgObject;
  }

  return {};
};

var _default = convertToBgImage;
exports["default"] = _default;