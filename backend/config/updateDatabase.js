import mongoose from 'mongoose'
import Product from '../models/productModel.js'

const updateProducts = async () => {
  // Conecte ao seu banco de dados
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    family: 4,
  })

  // Encontre todos os produtos
  const products = await Product.find({})

  // Adicione o campo isHidden a cada produto e salve
  products.forEach(async (product) => {
    product.isHidden = false
    await product.save()
  })

  console.log('Banco de dados atualizado com sucesso')
}

updateProducts()
