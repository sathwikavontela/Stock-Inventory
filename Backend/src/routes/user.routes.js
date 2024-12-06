import { Router } from 'express'
import { createDept, loginUser } from '../controllers/user.controller.js'
import { verifyJwt } from '../middleware/auth.middleware.js'

const router = Router()

router.route('/create').post(createDept)
router.route('/login').post(loginUser)
export default router
