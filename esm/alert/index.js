import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "kind"];
import React from 'react';
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
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: prefixCls,
    style: {
      background: kinds[kind]
    }
  }, rest), children);
};
export default Alert;