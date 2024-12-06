import { Router } from 'express'
import { createFIC } from '../controllers/fic.controller.js'
// import { verifyJwt } from '../middleware/auth.middleware.js'

const router = Router()

router.route('/createFic').post(createFIC)
// router.route('/loginFic').post(loginFIC)

export default router
