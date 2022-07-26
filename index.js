const dotenv= require('dotenv').config();
const express = require('express');
const expressLayout =require("express-ejs-layouts");
const mongoose=require('mongoose');

const PORT =process.env.PORT || 3000;

const path=require("path");
const flash = require("connect-flash");
const session=require("express-session");
const passport=require("passport");
const app = express();

//Passport config 
require("./src/config/passport")(passport);

//DB Config
require("./src/config/database");

//EJS
app.use(expressLayout);
app.set("view engine","ejs");
app.set("views", path.resolve(__dirname,"./src/views"));

//BodyParser
app.use(express.urlencoded({extended:false}))

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

//pasport middleware
app.use(passport.initialize());
app.use(passport.session());

  //Connect Flash
  app.use(flash());

  //Global use;
  app.use((req,res,next)=>{
    res.locals.success_msg=req.flash("success_msg");
    res.locals.error_msg=req.flash("error_msg");
    res.locals.error=req.flash("error");

    next();

  });

const router =require('./src/routers/dashboardRouter');
const userRouter =require('./src/routers/authRouter');

//ROUTES
app.use("/",router);
app.use("/users",userRouter);
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});
