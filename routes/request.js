const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter = express.Router();

requestsRouter.get("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  console.log("Sending Request");
  res.send(user.firstName + " sent the message");
});

module.exports = requestsRouter;
