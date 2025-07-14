const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const userRouter = express.Router();

//get all the 'pending' connection req for loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      //to find connectionReq of particularID, toUserId = loggedInUserId
      toUserId: loggedInUser._id,
      status: "interested", //pending status
    }).populate('fromUserId', 'firstName lastname photoUrl about gender skills')
    //.populate("fromUserId", ["firstName", "lastname"]);
     //populate is used to get the user data from the User model, so that we can show the user data in the connection request, that will help us to show the user data in the frontend

     //2nd way to write populate
    res.json({
      message: "Data fetched Successfully ",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("Error " + error);
  }
});

module.exports = {
  userRouter,
};
