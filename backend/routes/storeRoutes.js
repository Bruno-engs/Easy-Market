import express from 'express'
const router = express.Router()
import {
  getStores,
  getAll,
  getStoreById,
  deleteStore,
  createStore,
  updateStore,
  createStoreReview,
  getTopStores,
  getMyStores,
  checkStoreOrders,
} from '../controllers/storeController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getStores,getAll).post(protect, admin, createStore)
router.route('/mystores').get(protect, admin, getMyStores)
router.route('/:id/reviews').post(protect, createStoreReview)
router.get('/top', getTopStores)
router
  .route('/:id')
  .get(getStoreById)
  .delete(protect, admin, deleteStore)
  .put(protect, admin, updateStore)
router.route('/:id/products/orders').get( checkStoreOrders);

export default router
