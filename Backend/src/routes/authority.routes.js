import { Router } from "express";
import {
  createAuthority,
  loginAuthority,
  logout,
} from "../controllers/authority.controller.js";
// import { verifyJwt } from '../middleware/auth.middleware.js'

const router = Router();

router.route("/createAuthority").post(createAuthority);
router.route("/login").post(loginAuthority);
router.route("/logout").get(logout);

export default router;
