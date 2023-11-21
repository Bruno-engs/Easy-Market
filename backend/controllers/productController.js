import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'



// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

const getMyProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user?._id })
  res.json( products )
})

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
        isHidden: false, // Altere para isHidden
      }
    : { isHidden: false } // Altere para isHidden

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


const checkProductOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find({ "orderItems.product": req.params.id });
  const deliveredOrders = await Order.find({ 
    "orderItems.product": req.params.id,
    "isPaid": true,
    "isDelivered": false
  });

  res.json({ 
    hasOrders: allOrders.length > 0,
    hasDeliveredOrders: deliveredOrders.length > 0 
  });
})


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    // Procurar por pedidos com este produto que ainda não foram enviados
    const pendingOrders = await Order.find({ 
      "orderItems.product": req.params.id,
      "isDelivered": false
    });

    if (pendingOrders.length > 0) {
      // Se houver pedidos pendentes, esconder o produto
      product.isHidden = true;
      await product.save();
      res.json({ message: 'Product hidden' })
    } else {
      // Se não houver pedidos pendentes, deletar o produto
      await product.remove()
      res.json({ message: 'Product removed' })
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
    isHidden: false
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    if (req.body.name) product.name = req.body.name;
    if (req.body.store_id) product.store_id = req.body.store_id;
    if (req.body.price) product.price = req.body.price;
    if (req.body.description) product.description = req.body.description;
    if (req.body.image) product.image = req.body.image;
    if (req.body.brand) product.brand = req.body.brand;
    if (req.body.category) product.category = req.body.category;
    if (req.body.countInStock) product.countInStock = req.body.countInStock;
    if (req.body.isHidden !== undefined) product.isHidden = req.body.isHidden;

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateOrderProduct = asyncHandler(async (req, res) => {
  const {
    countInStock,
  } = req.body
  console.log(req.body);
  const product = await Product.findById(req.params.id)

  if (product) {

    product.countInStock = countInStock

    const updateOrderProduct = await product.save()
    res.json(updateOrderProduct)

  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getMyProducts,
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  updateOrderProduct,
  createProductReview,
  getTopProducts,
  checkProductOrders, 
}
