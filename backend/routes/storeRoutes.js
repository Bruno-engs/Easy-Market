import express from 'express'
const router = express.Router()
import {
  getStores,
  getStoreById,
  deleteStore,
  createStore,
  updateStore,
  createStoreReview,
  getTopStores,
} from '../controllers/storeController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getStores).post(protect, admin, createStore)
router.route('/:id/reviews').post(protect, createStoreReview)
router.get('/top', getTopStores)
router
  .route('/:id')
  .get(getStoreById)
  .delete(protect, admin, deleteStore)
  .put(protect, admin, updateStore)

export default router
