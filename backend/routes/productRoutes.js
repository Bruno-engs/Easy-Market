import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  updateOrderProduct,
  createProductReview,
  getTopProducts,
  getMyProducts,
  checkProductOrders 
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/myproducts').get(protect, admin, getMyProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct, updateOrderProduct)
  router
  .route('/order/:id')
  .put(protect, admin, updateOrderProduct)
  router.get('/:id/orders', checkProductOrders)

export default router
