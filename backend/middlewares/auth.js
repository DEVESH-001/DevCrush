const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userAuth = async (req, res, next) => {
  try {
    // read the token from req cookies
    const { token } = req.cookies;
    // if not token found
    if (!token) {
      return res.status(401).send("Please loggin");
    }
    // validate token
    const decodedObj = await jwt.verify(token, "your_jwt_secret@1");
    const { _id } = decodedObj;
    // find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    //if i find the user than attact the user (req.obj), as we are also finding the user in the app.js db, so there is no need to find there as we are already finding the user here

    req.user = user; //attaching the use to req.obj (this is the loggedIn user)
    next(); //is called to move to req handler
  } catch (error) {
    res.status(404).send("Error: " + error.message);
  }
};

module.exports = {
  userAuth,
};
