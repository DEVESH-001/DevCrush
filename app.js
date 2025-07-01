const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

//adding middleware
app.use(express.json());
app.use(cookieParser());

//creating APIs
app.post("/signup", async (req, res) => {
  try {
    //1st thing: validation of data -> encrypt password -> store in db
    validateSignUpData(req);
    //encryting
    const { firstName, lastname, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    //create a new Instance for the User model
    const user = new User({
      firstName,
      lastname,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User saved successfully ;)");
  } catch (error) {
    res.send("ERROR : " + error.message);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {
      //create a jwt token
      const token = await user.getJWT(); //getJwt is a method in user model that generates a JWT token
      //send back the token to the user
      //add the token to cookie & send the response back to user
      res.cookie("token", token);
      res.send("User LogIn successfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error " + error);
  }
});

//call profile & validate cookie
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(404).send("Error " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending");
  res.send(user.firstName + " sent the request");
});
//calling the connectDB fn from db.js
connectDB()
  .then(() => {
    console.log("DB connected successfully");
    //after connecting to db, server will run (good approach)
    app.listen(4000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log(err, "Error connecting to DB ! ! !");
  });
