const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

//creating APIs

app.post("/signup", async (req, res) => {
  //create a new Instance for the User model
  const user = new User({
    firstName: "Devesh",
    lastName: "Yadav",
    emailId: "sher@gmail.com",
    password: "Sher@123",
  });
  try {
    await user.save();
    res.send("User saved successfully ;)");
  } catch (error) {
    console.log(`Error saving user in db, ${error}`);
  }
});

//calling the connectDB fn from db.js
connectDB()
  .then(() => {
    console.log("DB connected successfully");
    //after connecting to db, server will run (good approach)
    app.listen(7777, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log(err, "Error connecting to DB ! ! !");
  });
