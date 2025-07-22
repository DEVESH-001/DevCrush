const express = require("express");
const { userAuth } = require("../middlewares/auth");
const user = require("../models/userModel");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(404).send("Error " + error);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request 😒");
    }
    const LoggedInUser = req.user; // user is already attached to req by userAuth middleware
    Object.keys(req.body).forEach((key) => (LoggedInUser[key] = req.body[key])); // update the user object with the new data from req.body
    await LoggedInUser.save();

    res.send(
      LoggedInUser.firstname + "'s" + " " + "Profile Updated Successfully 😁"
    );
  } catch (error) {
    res.status(404).send("Error " + error);
  }
});

module.exports = profileRouter;
