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