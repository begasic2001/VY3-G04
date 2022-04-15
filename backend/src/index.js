const express = require('express')
<<<<<<< HEAD
const cors = require('cors')
=======
const dotenv = require('dotenv')
const cors = require('cors')
const session = require("express-session");
>>>>>>> a06811a (Upload V2)
const cookieParser = require('cookie-parser')
const app = express()
const morgan = require('morgan')
const hbs = require('express-handlebars');
const path = require('path')
const route = require('./router')
const port = 9000
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
<<<<<<< HEAD

=======
app.use(
  session({
    secret: "MINHTHANH",
    resave: true,
    saveUninitialized: true,
  })
);
>>>>>>> a06811a (Upload V2)
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
// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources','views'));
// đường dẫn 
route(app)
app.listen(port, () => {
<<<<<<< HEAD
  console.log(`http://localhost:${port}/booking`)
=======
  console.log(`http://localhost:${port}/api`)
>>>>>>> a06811a (Upload V2)
})