import { Router } from 'express'
import {
  createProduct,
  getAllProducts,
} from '../controllers/product.controller.js'
import { verifyJwt } from '../middleware/auth.middleware.js'

const router = Router()
router.route('/create').post(verifyJwt, createProduct)
router.route('/getAllProducts').get(verifyJwt, getAllProducts)

export default router
