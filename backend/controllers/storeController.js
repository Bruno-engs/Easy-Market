import asyncHandler from 'express-async-handler'
import Store from '../models/storeModel.js'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'


// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

const getMyStores = asyncHandler(async (req, res) => {
  const stores = await Store.find({ user: req.user?._id })
  res.json( stores )
})

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getStores = asyncHandler(async (req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const count = await Store.countDocuments({ ...keyword })
  const stores = await Store.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ stores, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getAll = asyncHandler(async (req, res) => {
  const stores = await Store.find({})
  res.json({ stores })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getStoreById = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id)
  let products = await Product.find({
    store_id: store._id,
    isHidden: false,
  });

  if (store) {
    res.json({ ...store._doc, products })
  } else {
    res.status(404)
    throw new Error('store not found')
  }
})

const checkStoreOrders = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  const products = await Product.find({ store_id: req.params.id });

  let hasPendingOrders = false;

  for (let product of products) {
    const pendingOrders = await Order.find({ 
      "orderItems.product": product._id,
      "isPaid": true,
      "isDelivered": false
    });

    if (pendingOrders.length > 0) {
      hasPendingOrders = true;
      break;
    }
  }

  res.json({ 
    hasProducts: products.length > 0,
    hasPendingOrders 
  });
});




// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id)

  if (store) {
    // Procurar por produtos com esta loja
    const products = await Product.find({ store_id: req.params.id });

    if (products.length > 0) {
      // Se houver produtos, verificar se algum deles tem pedidos pendentes
      let hasPendingOrders = false;
      for (let product of products) {
        const pendingOrders = await Order.find({ 
          "orderItems.product": product._id,
          "isPaid": true,
          "isDelivered": false
        });

        if (pendingOrders.length > 0) {
          hasPendingOrders = true;
          break;
        }
      }

      if (hasPendingOrders) {
        // Se houver pedidos pendentes, esconder a loja e todos os seus produtos
        store.isHidden = true;
        await store.save();
        for (let product of products) {
          product.isHidden = true;
          await product.save();
        }
        res.json({ message: 'Store and all its products hidden due to pending orders' })
      } else {
        // Se não houver pedidos pendentes, deletar a loja e todos os seus produtos
        await Product.deleteMany({ store_id: req.params.id });
        await store.remove()
        res.json({ message: 'Store and all its products removed' })
      }
    } else {
      // Se a loja não tiver produtos, deletar a loja
      await store.remove()
      res.json({ message: 'Store removed' })
    }
  } else {
    res.status(404)
    throw new Error('Store not found')
  }
})





// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createStore = asyncHandler(async (req, res) => {
  const store = new Store({
    name: 'Sample name',
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    location: {
      lat: 1.123,
      lng: 1.23

    },

  })

  const createdStore = await store.save()
  res.status(201).json(createdStore)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id)

  if (store) {
    if (req.body.name ) store.name = req.body.name;
    if (req.body.image ) store.image = req.body.image;
    if (req.body.category ) store.category = req.body.category;
    if (req.body.location ) store.location = req.body.location;
    if (req.body.isHidden !== undefined) {
      store.set({ isHidden: req.body.isHidden });
    }
    const updatedStore = await store.save()
    res.json(updatedStore)
  } else {
    res.status(404)
    throw new Error('Store not found')
  }
})


// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createStoreReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const store = await Store.findById(req.params.id)

  if (store) {
    const alreadyReviewed = store.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('store already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    store.reviews.push(review)

    store.numReviews = store.reviews.length

    store.rating =
      store.reviews.reduce((acc, item) => item.rating + acc, 0) /
      store.reviews.length

    await store.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('store not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopStores = asyncHandler(async (req, res) => {
  const stores = await Store.find({}).sort({ rating: -1 }).limit(3)

  res.json(stores)
})

export {
  getMyStores,
  getStores,
  getAll,
  getStoreById,
  deleteStore,
  createStore,
  updateStore,
  createStoreReview,
  getTopStores,
  checkStoreOrders,
}
