const express = require("express");
require("dotenv").config();
// const dotenv = require('dotenv')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const morgan = require("morgan");
const hbs = require("express-handlebars");
const path = require("path");
const route = require("./router");
const port = process.env.PORT || 9000;
const hostname = process.env.HOSTNAME || "localhost";
const methodOverride = require("method-override");
const session = require("express-session");

app.use(methodOverride("_method"));
app.use(morgan("combined"));
app.use(cors());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// app.use(fileUpload())
// Template engine
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
// app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "resources", "views"));
// đường dẫn
route(app);

app.use(
  session({
    secret: "MINHTHANH",
    // store: new RedisStore({ client: redisClient }),
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    },
  })
);
// app.get('get-session', (req,res)=>{
//   res.send(req.session)
// })
// app.get('set-session', (req,res)=>{
//   req.session.user={
//     name:"MinhThanh",
//     age:21
//   }
// })
app.listen(port, () => {
  console.log(`http://${hostname}:${port}/api`);
});
