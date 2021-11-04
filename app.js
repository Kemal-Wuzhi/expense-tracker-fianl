const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

const ifEqual = require('./tools/handlebarshelpers')

require('./config/mongoose')

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    ifEqual
  }
}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({
  extended: true
}))
app.use(methodOverride('_method'))
app.use(routes)



app.listen(PORT, () => {
  console.log(`This is listening on http://localhost:${port}`)
})