const Category = require('../category')
const User = require('../user')
const Record = require('../record')

const users = require('./user.json').users
const records = require('./record.json').records

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

db.once('open', async () => {
  await users.forEach(user => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
  })
  await records.forEach(async record => {
    const recordCategory = await Category.findOne({
      name: record.category
    }).lean()

    const recordUser = await User.findOne({
      name: record.user
    }).lean()

    Record.create({
      userId: recordUser._id,
      name: record.name,
      date: record.date,
      amount: record.amount,
      categoryId: recordCategory._id
    })
  })

  console.log('recordSeeder done!')
})