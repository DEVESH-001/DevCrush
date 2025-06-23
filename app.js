const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

//creating middleware
app.use(express.json());
//creating APIs
app.post("/signup", async (req, res) => {
  //create a new Instance for the User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User saved successfully ;)");
  } catch (error) {
    console.log(`Error saving user in db, ${error}`);
  }
});

//get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.send("Error loading feed", error);
  }
});

//find user email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong", error);
  }
});

//delete a user
app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.send(400).send("Something went wrong");
  }
});

//updating user
app.patch("/update", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  //console.log(data);

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });
    console.log(user);

    res.send("User updated");
  } catch (error) {
    res.status(400).send("Something went wrong");
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
