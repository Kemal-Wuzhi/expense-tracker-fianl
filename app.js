const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const ifEqual = require('./tools/handlebarshelpers')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const routes = require('./routes')
const session = require('express-session')
const flash = require('connect-flash')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT



app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    ifEqual
  }
}))
app.set('view engine', 'hbs')

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(express.urlencoded({
  extended: true
}))
app.use(methodOverride('_method'))

app.use(flash())
usePassport(app)
//check again
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`This is listening on http://localhost:${PORT}`)
})