"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get("/", function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '../../frontend/dist/index.html'));
});
var _default = router;
exports["default"] = _default;