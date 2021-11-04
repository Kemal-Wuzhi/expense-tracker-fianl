const Category = require('../category')
const db = require('../../config/mongoose')
const categoryList = require('./category.json')

db.once('open', () => {
  console.log('mongodb connected')
  Category.create(categoryList)
    .then(() => {
      console.log('CategorySeed done')
      return db.close()
    })
})