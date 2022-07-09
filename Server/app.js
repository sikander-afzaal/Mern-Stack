const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// so out api key doesnot become public
dotenv.config({
  path: "./config.env",
});

const PORT = process.env.PORT || 5000; // port of the server

//getting db connection code is in diff file so that we can use it everywhere with ease
require("./db/conn");

app.use(express.json()); // converting all the data to json format
app.use(cookieParser());
app.use(require("./router/auth")); //we link the router file here so we can use the routes

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});
