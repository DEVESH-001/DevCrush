const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastname: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address : " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(" Use strong password   ");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url : " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is the default about of user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Method to get JWT token for the user for authentication , we have created this function to get the JWT token for the user as it will help un authenticating the user so that we dont need to find the user in the db again and again. Don't use arrow fun beacuse is will not work with 'this' keyword
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "your_jwt_secret@1", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHashed = user.password;
  // Compare the password present in the db provided by the user, #don't interchange the orders
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHashed
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
