const express = require("express");
const connectDB = require("./config/database");
const app = express();

connectDB()
  .then(() => {
    console.log("DB connected successfully . . .");
    //after connecting to db, server will run (good approach)
    app.listen(4000, () => {
      console.log("Server listening on 7 7 7 7");
    });
  })
  .catch((err) => {
    console.log(err, "Error connecting to DB ! ! !");
  });
