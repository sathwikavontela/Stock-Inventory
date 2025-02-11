import { Router } from "express";
import {
  createRequestForm,
  getApprovedRequests,
  getDepartmentReportsForFic,
  getRequestFormById,
  getRequestForms,
  getRequestFormsForAuthority,
  getRequestFormsForFic,
  getRequestsForDepartments,
  updateStatus,
} from "../controllers/request.controller.js";
import {
  verifyAuthority,
  verifyFic,
  verifyJwt,
} from "../middleware/auth.middleware.js";

const router = Router();
router.route("/createRequest").post(verifyJwt, createRequestForm);
router.route("/getRequests").get(verifyJwt, getRequestForms);
router.route("/getRequestsforFic").get(verifyFic, getRequestFormsForFic);
router
  .route("/getRequestsforAuthority")
  .get(verifyAuthority, getRequestFormsForAuthority);
router.route("/getRequestById/:orderId").get(getRequestFormById);

router
  .route("/getRequestsByDepartment")
  .get(verifyJwt, getRequestsForDepartments);
router
  .route("/getRequestsByDepartmentForFic/:id")
  .get(verifyFic, getDepartmentReportsForFic);
router
  .route("/getApprovedRequestsByDepartment")
  .get(verifyJwt, getApprovedRequests);

router.route("/updateStatus/:orderId").put(verifyAuthority, updateStatus);

export default router;
