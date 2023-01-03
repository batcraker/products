import { Router } from "express";
import { verifyToken, isAdmin } from "../middlewares/";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller";

const router = Router();

router.post("/",[verifyToken, isAdmin], createProduct);
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put("/:productId", [verifyToken, isAdmin], updateProductById);
router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

export default router;
