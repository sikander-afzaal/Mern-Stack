const mongooseClient = require("mongoose");

//connecting mongo db to our app
const DB = process.env.DATABASE;
mongooseClient
  .connect(DB)
  .then((response) => console.log("connected"))
  .catch((err) => console.log("lmao loser"));
