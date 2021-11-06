const User = require('../user')
const Category = require('../category')
const Record = require('../record')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')

const SEED_RECORDS = [{
    name: "晚餐",
    category: "餐飲食品",
    date: "2021-01-30",
    amount: 300,
    user: "野原美冴"
  },
  {
    "name": "房貸",
    "category": "家居物業",
    "date": "2021-05-05",
    "amount": 25000,
    "user": "野原廣志"
  }
]

db.once('open', () => {
  Promise
    .all(Array.from(
      SEED_RECORDS,
      SEED_RECORD => {
        return User
          .findOne({
            name: SEED_RECORD.user
          })
          .then(user => user._id)
          .then(userId => {
            return Category
              .findOne({
                name: SEED_RECORD.category
              })
              .then(category => category._id)
              .then(categoryId => {
                return Record.create({
                  ...SEED_RECORD,
                  userId,
                  categoryId
                })
              })
          })
          .catch(err => console.error(err))
      }
    ))
    .then(() => {
      console.log('SEED_RECORDSdone.')
      process.exit()
    })
    .catch(err => console.error(err))
})