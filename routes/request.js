const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id; // Who's sending (from login info)
      const toUserId = req.params.toUserId; // Who's receiving (from URL)
      const status = req.params.status; // What status (from URL)

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status Type " + status });
      }

      //check so that random person can't send request to anyone (nonValidUser)
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found 😶" });
      }
      //if there is existing ConnectionRequest, also check if someone has already sent the request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection request already sent 😏" });
      }

      //saving connection req
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      //saving the connection request to the database
      const data = await connectionRequest.save(); //whenever we call this save method it will be called pre-saved (connectionRequestSchema.pre)

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (error) {
      res.status(400).send("Error " + error);
    }
  }
);

module.exports = requestRouter;
