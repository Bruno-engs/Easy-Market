import express from 'express'
import Store from '../models/storeModel.js'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js';

const router = express.Router();

router.get('/stores', async (req, res) => {
  try {
    const stores = await Store.find({})
    res.json({stores})
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});
router.get('/mystores/:id', async (req, res) => {
  try {
    const stores = await Store.find({ user: req.params?._id })
    res.json({stores})
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({ isHidden: false })
    res.json({products})
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});





export default router