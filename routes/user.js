const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const User = require("../models/userModel");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastname photoUrl about gender skills";

//get all the 'pending' connection req for loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      //to find connectionReq of particularID, toUserId = loggedInUserId
      toUserId: loggedInUser._id,
      status: "interested", //pending status
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    //populate is used to get the user data from the User model, so that we can show the user data in the connection request, that will help us to show the user data in the frontend

    //const data = connectionRequests.map((row) => row.fromUserId);
    res.json({
      message: "Data fetched Successfully ",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("Error " + error);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    //fetch all the connectionReq via checking status
    const connectionRequests = await ConnectionRequest.find({
      //OR query
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    //console.log(connectionRequests);

    const data = connectionRequests.map((row) => {
      // if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
      //   return row.toUserId;
      // } or
      // if (row.fromUserId._id.equals(loggedInUser._id)) {
      //   return row.toUserId;
      // }
      //using template. literals
      if (`${row.fromUserId._id}` === `${loggedInUser._id}`) {
        return row.toUserId;
      }
      return row.fromUserId;
    }); //map to get only the user data from the connection request
    res.json({ data });
  } catch (error) {
    res.status(400).send("Error " + error);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    //find all the connection req(rej+ acc)
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    //find all the unique people whoes profile we dont wann send,create set
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    //console.log(hideUsersFromFeed);
    //find out remaining user, revese query
    //mongodb.com/docs/manual/reference/operator/query/and/
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } }, // nin: not in
        { _id: { $ne: loggedInUser._id } }, // /!=
      ], //find all the users whoes _id is not present in the hideUserFeed[],also dont show your own card here
    }).select(USER_SAFE_DATA);
    res.send(users);
  } catch (error) {
    res.status(400).send("Error " + error);
  }
});

module.exports = {
  userRouter,
};
