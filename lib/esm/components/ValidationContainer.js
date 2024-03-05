"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationContainerFields = void 0;
exports["default"] = ValidationContainer;
var _react = _interopRequireWildcard(require("react"));
var _CollectJSContext = _interopRequireDefault(require("../contexts/CollectJSContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ValidationContainer(_ref) {
  var children = _ref.children,
    validationFields = _ref.validationFields;
  var _useContext = (0, _react.useContext)(_CollectJSContext["default"]),
    errors = _useContext.state.errors;
  var relevantErrors = (0, _react.useMemo)(function () {
    if (validationFields instanceof Array) {
      return errors.filter(function (error) {
        return validationFields.includes(error.fieldName);
      });
    } else {
      return errors;
    }
  }, [errors, validationFields]);
  var isValid = (0, _react.useMemo)(function () {
    return relevantErrors.length === 0;
  }, [relevantErrors]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, children({
    isValid: isValid,
    errors: relevantErrors
  }));
}
var ValidationContainerFields = exports.ValidationContainerFields = {
  ccNumber: 'ccnumber',
  ccExp: 'ccexp',
  cvv: 'cvv',
  checkAccount: 'checkaccount',
  checkAba: 'checkaba',
  checkName: 'checkname'
};