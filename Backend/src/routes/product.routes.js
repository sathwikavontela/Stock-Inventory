import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
import { verifyFic, verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/create").post(createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getAllProductsForFic").get(getAllProducts);

export default router;
