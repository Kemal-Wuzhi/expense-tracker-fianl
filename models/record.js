const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({

  name: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  amount: {
    type: Number,
    require: true,
  }
})

module.exports = mongoose.model('Record', recordSchema)