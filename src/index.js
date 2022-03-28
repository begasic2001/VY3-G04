const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const morgan = require('morgan')
const hbs = require('express-handlebars');
const path = require('path')
const route = require('./router')
const port = 3000
const db = require('./config/db/index')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(morgan('combined'))
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());




app.use(express.static(path.join(__dirname, 'public')))

// Template engine
app.engine('hbs', hbs.engine(
  {
    extname: '.hbs',
    helpers: {
      sum : (a,b) => a+b ,
      
  }
}
  
  ));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));




// đường dẫn 
route(app)
// kết nối database
db.connect()

app.listen(port, () => {
  console.log(`http://localhost:${port}/booking`)
})