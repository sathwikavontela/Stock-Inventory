import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProductQuantity,
} from "../controllers/product.controller.js";
import { verifyFic, verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/create").post(createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getAllProductsForFic").get(getAllProducts);
router.route("/editProduct").put(updateProductQuantity);

export default router;
