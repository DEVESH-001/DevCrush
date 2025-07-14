const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId, //ID getting from mongoDB
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      }, //enum is created to restrict the values of a field
    },
  },
  { timestamps: true }
);

//creating indexes for schema, if i do a query on fromUserId, it will be faster
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
//creating compound index on fromUserId and toUserId,compound index is used to speed up queries that filter on multiple fields. The first field in the index is fromUserId and the second field is toUserId. This means that queries that filter on both fields will be faster than queries that filter on only one field.

//schema pre
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //check if fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    return next(new Error("Connot send connection request to yourself 🙈"));
  }
  next();
});

//creating a model from the schema which will be used to create a collection in the database t
const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = {
  ConnectionRequest,
};
