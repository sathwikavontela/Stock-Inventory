import { Router } from "express";
import {
  createDept,
  getApprovedProducts,
  getApprovedProductsForAuthority,
  getDepts,
  logoutUser,
} from "../controllers/user.controller.js";
import {
  verifyAuthority,
  verifyFic,
  verifyJwt,
} from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(createDept);
// router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/getDepts").get(verifyFic, getDepts);
router.route("/get/approved/items").get(verifyJwt, getApprovedProducts);
router
  .route("/get/approved/items1")
  .get(verifyAuthority, getApprovedProductsForAuthority);
export default router;
