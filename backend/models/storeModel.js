import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const storeSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
//        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      location: {
        type: Object,
        required: true,
      },
      reviews: [reviewSchema],
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
      numReviews: {
        type: Number,
        required: true,
        default: 0,
      },
      isHidden: {
        type: Boolean,
        required: true,
        default: false,
      },
    }, 
    {
      timestamps: true,
    }
  )
  
  const Store = mongoose.model('Store', storeSchema)
  
  export default Store
  