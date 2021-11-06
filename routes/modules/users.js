const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}), (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword
  } = req.body

  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({
      message: '每格都要填啦！'
    })
  }
  if (password !== confirmPassword) {
    errors.push({
      message: '密碼確認與密碼不相符！'
    })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User
    .findOne({
      email
    })
    .then(user => {
      if (user) {
        errors.push({
          message: '此電子郵件已被註冊'
        })
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.error(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已被登出')
  res.redirect('/users/login')
})

module.exports = router