const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')

const db = require('../../config/mongoose')

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
      SEE_USER => {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(SEED_USER.password, salt))
          .then(hash => User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
          }))
      }
    ))
    .then(() => {
      consolo.log('SEED_USERS is done.')
      process.exit()
    })
    .catch(err => console.error(err))
})