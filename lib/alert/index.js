"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["children", "kind"];
var prefixCls = 'pomelo-alert';
var kinds = {
  info: '#5352ED',
  positive: '#2ED573',
  negative: '#FF4757',
  warning: '#FFA502'
};
var Alert = function Alert(_ref) {
  var children = _ref.children,
    _ref$kind = _ref.kind,
    kind = _ref$kind === void 0 ? 'info' : _ref$kind,
    rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    className: prefixCls,
    style: {
      background: kinds[kind]
    }
  }, rest), children);
};
var _default = exports["default"] = Alert;