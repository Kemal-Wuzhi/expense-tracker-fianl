const bcrypt = require('bcryptjs')
const User = require('../user')
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USERS = [{
    name: '野原廣志',
    email: 'HIROSHI@example.com',
    password: '0000'
  },
  {
    name: '野原美冴',
    email: 'MISAE@example.com',
    password: '0000'
  }
]

db.once('open', () => {
  Promise
    .all(Array.from(
      SEED_USERS,
      SEED_USERS => {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(SEED_USER.password, salt))
          .then(hash => User.create({
            name: SEED_USERS.name,
            email: SEED_USERS.email,
            password: hash
          }))
      }
    ))
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(err => console.error(err))
})