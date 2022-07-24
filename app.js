const express = require('express');           // npm i express (to install express module)
const app = express();                        // now all properties , methods are of express comes to app
const dotenv = require('dotenv');             // npm i dotenv (it stores data out of node code for security purposes) 
app.use(express.json());                     // we are using this like a middle ware . since node does not understand json .so when we get data by post in jsong fomat it will strinfy using this code
app.use(express.urlencoded()); 
const bodyParser = require('body-parser')
dotenv.config({path:'./config.env'});              // calling env file path
const DB = process.env.DATABASE ;
app.use(require('./router/auth.js'));      // using this as amiddle ware 
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
require('./db/conn');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
const User = require('./model/userSchema')  // here jo hm userschema me export kiye the yaha bo user get kr rhe
const cookieParser = require('cookie-parser')
// const express = require('express');
// const app = express();
app.use(cookieParser());
// const middleware = (req,res,next)=>{
//     // res.send(`<h1>About Pfgfage</h1>`);
//     next();
//     res.send(`<h1>About Pfgfage</h1>`);
// }
app.use("/uploads", express.static('uploads'));   // isko likhne se img display hone lge database wale
app.get('/',(req,res) => {                                       // syntax app.get(path, callback function)
res.send(`<h1>Home Page</h1>`);
})

// app.get('/aboutme', middleware,(req,res) => {                   // for the sake of authtication we use middle ware betwenn path and callbCK FUNCTION
// res.send(`<h1>About Page</h1>`);
// })
app.get('/contact',(req,res) => {
    console.log(`cokies is ${req.cookies.jwt}`);
})
app.get('/login',(req,res) => {
res.send(`<h1>Login Page</h1>`);
})
// production code start
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./front/build")));
    
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "front", "build", "index.html"));
    });
  }
   
// production code end 


app.listen(PORT,()=>{
    console.log(`Server is running on port no. ${PORT}`);
})
