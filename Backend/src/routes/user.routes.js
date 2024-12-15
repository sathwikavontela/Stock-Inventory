import { Router } from "express";
import {
  createDept,
  getDepts,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyAuthority, verifyFic } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(createDept);
// router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/getDepts").get(verifyFic, getDepts);
export default router;
