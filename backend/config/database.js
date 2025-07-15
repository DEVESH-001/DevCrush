const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://dd4168:nZXThCPT4BWuKssb@devtinder-1.idz1xwd.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
