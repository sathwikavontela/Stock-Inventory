import { Router } from "express";
import {
  createAuthority,
  loginAuthority,
  logout,
} from "../controllers/authority.controller.js";
import { get } from "mongoose";
import { verifyAuthority } from "../middleware/auth.middleware.js";
import { getDepts } from "../controllers/user.controller.js";
// import { verifyJwt } from '../middleware/auth.middleware.js'

const router = Router();

router.route("/createAuthority").post(createAuthority);
router.route("/login").post(loginAuthority);
router.route("/logout").get(logout);
router.route('/getDepts').get(verifyAuthority, getDepts);


export default router;
