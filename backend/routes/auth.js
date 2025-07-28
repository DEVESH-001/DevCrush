//manage routes for auth

const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { userAuth } = require("../middlewares/auth");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req); //validate the data from req.body
    const { firstname, lastname, emailId, password } = req.body;
    //hashing password
    const passwordHash = await bcrypt.hash(password, 10);
    //create a new user instance
    const user = new User({
      firstname,
      lastname,
      emailId,
      password: passwordHash,
    });
    //saving user to db
    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.cookie("token", token, {});
    res.json({ message: "User have been saved to db ✅", data: savedUser });
  } catch (error) {
    res.status(404).send("Error " + error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials 😵");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //if password is valid, create a JWT token for the user
      const token = await user.getJWT(); //getJWT() : user model
      //send the token to the user in a cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).send(user);
    } else {
      throw new Error("Invalid Credentials 😵");
    }
  } catch (error) {
    res.status(401).send("Error: " + error.message);
  }
});

authRouter.post("/logout", userAuth, (req, res) => {
  //more cleanup can be done
  res.cookie("token", null, {
    // null is the value of the cookie
    expires: new Date(Date.now()),
  });
  res.send("You have been logout 😔");
});
module.exports = authRouter;
