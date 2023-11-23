import mongoose from 'mongoose'
import Store from '../models/storeModel.js'

const updateStores = async () => {
  // Conecte ao seu banco de dados
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    family: 4,
  })

  // Encontre todas as lojas
  const stores = await Store.find({})

  // Adicione o campo isHidden a cada loja e salve
  stores.forEach(async (store) => {
    store.isHidden = false
    await store.save()
  })

  console.log('Banco de dados atualizado com sucesso')
}

updateStores()

