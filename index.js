const { Router } = require("express");
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();
const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);
const csrf = require('csurf');
const cloudinaryRoutes = require('./routes/cloudinary.js')


// console.log(process.env.CLOUDINARY_NAME)
// console.log(process.env.CLOUDINARY_API_KEY)
// console.log(process.env.CLOUDINARY_API_SECRET)
// console.log(process.env.CLOUDINARY_UPLOAD_PRESET)

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));


// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
  express.urlencoded({
    extended: false
  })
);
// set up sessions
app.use(session({
  'store': new FileStore(),
  'secret': 'keyboard cat',
  'resave': false, //session will not be resaved if there are no changes
  'saveUninitialized': true // if a client connects with no session, immediately create one
  }))

//flash 
app.use(flash());

// Register Flash middleware
app.use(function (req, res, next) {
res.locals.success_messages = req.flash("success_messages");
res.locals.error_messages = req.flash("error_messages");
next();
});

// enable CSRF
app.use(csrf());

// Share CSRF with hbs files
app.use(function(req,res,next){
  res.locals.csrfToken = req.csrfToken();
  next();
  })  

// Share the user data with hbs files
app.use(function(req,res,next){
  res.locals.user = req.session.user;
  next();
})
  

//Import Routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

//async function
async function main() {
    app.use('/products', productRoutes);
    app.use('/users', userRoutes);
    app.use('/cloudinary', cloudinaryRoutes);



    
//end of main function 
}

main();

app.listen(3000, () => {
  console.log("Server has started");
});