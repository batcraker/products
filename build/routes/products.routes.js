"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _middlewares = require("../middlewares/");
var _products = require("../controllers/products.controller");
var router = (0, _express.Router)();
router.post("/", [_middlewares.verifyToken, _middlewares.isAdmin], _products.createProduct);
router.get("/", _products.getProducts);
router.get("/:productId", _products.getProductById);
router.put("/:productId", [_middlewares.verifyToken, _middlewares.isAdmin], _products.updateProductById);
router["delete"]("/:productId", [_middlewares.verifyToken, _middlewares.isAdmin], _products.deleteProductById);
var _default = router;
exports["default"] = _default;