"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CollectJSProvider;
var _CollectJSContext = _interopRequireDefault(require("./CollectJSContext"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function reducer(state, action) {
  switch (action.type) {
    case 'addError':
      return {
        errors: state.errors.concat([{
          fieldName: action.fieldName,
          message: action.message
        }])
      };
    case 'unsetErrors':
      return {
        errors: state.errors.filter(function (error) {
          return error.fieldName !== action.fieldName;
        })
      };
    default:
      throw new Error();
  }
}
function CollectJSProvider(_ref) {
  var children = _ref.children,
    collectJSPromise = _ref.collectJSPromise;
  var _useReducer = (0, _react.useReducer)(reducer, {
      errors: []
    }),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    dispatch = _useReducer2[1];
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    collect = _useState2[0],
    setCollect = _useState2[1];
  var addError = (0, _react.useCallback)(function (fieldName, message) {
    dispatch({
      type: 'addError',
      fieldName: fieldName,
      message: message
    });
  }, [dispatch]);
  var unsetErrors = (0, _react.useCallback)(function (fieldName) {
    dispatch({
      type: 'unsetErrors',
      fieldName: fieldName
    });
  }, [dispatch]);
  (0, _react.useEffect)(function () {
    collectJSPromise.then(function (collectJS) {
      setCollect(collectJS);
    });
    // No dependencies - we don't ever want this to run more than once. Calling this more times will cause fields to blink.
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_CollectJSContext["default"].Provider, {
    value: {
      state: state,
      collectJS: collect,
      addError: addError,
      unsetErrors: unsetErrors
    }
  }, children);
}