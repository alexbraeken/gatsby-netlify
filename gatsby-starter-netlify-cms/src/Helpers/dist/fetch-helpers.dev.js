"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAndSetAll = exports.fetchJson = void 0;

var fetchJson = function fetchJson(url) {
  var init,
      res,
      _args = arguments;
  return regeneratorRuntime.async(function fetchJson$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          init = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

          if (!(typeof window !== "undefined")) {
            _context.next = 14;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(url, init));

        case 4:
          res = _context.sent;

          if (res.ok) {
            _context.next = 13;
            break;
          }

          _context.t0 = Error;
          _context.t1 = "".concat(res.status, ": ");
          _context.next = 10;
          return regeneratorRuntime.awrap(res.text());

        case 10:
          _context.t2 = _context.sent;
          _context.t3 = _context.t1.concat.call(_context.t1, _context.t2);
          throw new _context.t0(_context.t3);

        case 13:
          return _context.abrupt("return", res);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
}; // get JSON from multiple URLs and pass to setters


exports.fetchJson = fetchJson;

var fetchAndSetAll = function fetchAndSetAll(collection) {
  var allData;
  return regeneratorRuntime.async(function fetchAndSetAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Promise.all(collection.map(function (_ref) {
            var url = _ref.url,
                init = _ref.init;
            return fetchJson(url, init);
          })));

        case 2:
          allData = _context2.sent;
          // iterate setters and pass in data
          collection.forEach(function (_ref2, i) {
            var setter = _ref2.setter;
            setter(allData[i]);
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.fetchAndSetAll = fetchAndSetAll;