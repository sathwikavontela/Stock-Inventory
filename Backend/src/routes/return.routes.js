import { Router } from "express";
import {
  createReturnForm,
  getreturns,
  getReturnsForAuthority,
  updateStatus,
} from "../controllers/return.controller.js";
import {
  verifyAuthority,
  verifyFic,
  verifyJwt,
} from "../middleware/auth.middleware.js";
const router = Router();

router.route("/returnRequest").post(verifyJwt, createReturnForm);
router.route("/getReturns").get(verifyJwt, getreturns);
router.route("/getReturnsForAuth").get(verifyAuthority, getReturnsForAuthority);
router.route("/getReturnsForFIC").get(verifyFic, getReturnsForAuthority);
router.route("/updateStatus/:id").put(verifyAuthority, updateStatus);

export default router;
