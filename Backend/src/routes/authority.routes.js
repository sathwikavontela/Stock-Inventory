import { Router } from 'express'
import {
  createAuthority,
  loginAuthority,
} from '../controllers/authority.controller.js'
// import { verifyJwt } from '../middleware/auth.middleware.js'

const router = Router()

router.route('/createAuthority').post(createAuthority)
router.route('/login').post(loginAuthority)

export default router
