const dotenv = require("dotenv");
const express = require("express");
const app = express();

// so out api key doesnot become public
dotenv.config({
  path: "./config.env",
});

const PORT = process.env.PORT; // port of the server

//getting db connection code is in diff file so that we can use it everywhere with ease
require("./db/conn");

app.use(express.json()); // converting all the data to json format

app.use(require("./router/auth")); //we link the router file here so we can use the routes

//middleware for our app
const middleware = (req, res, next) => {
  console.log("middle-ware");
  next();
};

//routes made using express js

app.get("/", (req, res) => {
  res.send("Main page");
});
app.get("/about", middleware, (req, res) => {
  res.send("about-page");
});

app.listen(PORT, () => {
  console.log("lol");
});
