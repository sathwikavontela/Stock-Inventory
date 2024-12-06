import { Router } from 'express'
import {
  createRequestForm,
  getRequestFormById,
  getRequestForms,
} from '../controllers/request.controller.js'
import { verifyJwt } from '../middleware/auth.middleware.js'

const router = Router()
router.route('/createRequest').post(verifyJwt, createRequestForm)
router.route('/getRequests').get(verifyJwt, getRequestForms)
router.route('/getRequestById/:orderId').get(verifyJwt, getRequestFormById)

export default router
