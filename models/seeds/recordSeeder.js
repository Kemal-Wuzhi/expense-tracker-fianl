const User = require('../user')
const Category = require('../category')
const Record = require('../record')
const bcrypt = require('bcryptjs')

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

const SEED_USER = {
  name: 'User1',
  email: 'user1@example.com',
  password: '00000000'
}

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
      console.log('SEED_RECORDS is done.')
      process.exit()
    })
    .catch(err => console.error(err))
})

// db.once('open', () => {
//   bcrypt
//     .genSalt(10)
//     .then((salt) => bcrypt.hash(SEED_USER.password, salt))
//     .then((hash) =>
//       User.create({
//         name: SEED_USER.name,
//         password: hash,
//         email: SEED_USER.email
//       })
//     )
//     .then((user) => {
//       const userId = user._id
//       return Promise.all(
//         Array.from({
//             length: SEED_RECORDS.length
//           }, (_, i) =>
//           Record.create({
//             name: SEED_RECORDS[i].name,
//             category: SEED_RECORDS[i].category,
//             date: SEED_RECORDS[i].date,
//             amount: SEED_RECORDS[i].amount,
//             merchant: SEED_RECORDS[i].merchant,
//             userId
//           })
//         )
//       )
//     })
//     .then(() => {
//       console.log('recordSeeder done ')
//       return db.close()
//     })
//     .catch((err) => console.error(err))
// })