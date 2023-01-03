"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user = require("../controllers/user.controller");
var _verifySignup = require("../middlewares/verifySignup");
var _authJwt = require("../middlewares/authJwt");
var router = (0, _express.Router)();
router.get('/', [_authJwt.verifyToken, _authJwt.isAdmin], _user.getUsers);
router.post('/', [_authJwt.verifyToken, _authJwt.isAdmin, _verifySignup.checkExistingUser, _verifySignup.checkExistingRoles], _user.createUser);
router.get('/:userId', [_authJwt.verifyToken, _authJwt.isAdmin], _user.getUser);
var _default = router;
exports["default"] = _default;