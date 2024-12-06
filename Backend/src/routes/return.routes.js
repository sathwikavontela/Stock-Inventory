import { Router } from 'express'
import {
  createReturnForm,
  getreturns,
} from '../controllers/return.controller.js'
import { verifyJwt } from '../middleware/auth.middleware.js'
const router = Router()

router.route('/returnRequest').post(verifyJwt, createReturnForm)
router.route('/getReturns').get(verifyJwt, getreturns)

export default router
