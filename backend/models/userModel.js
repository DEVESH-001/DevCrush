const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
      // /index:true, //this is how we create a unique index
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
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender type`,
      }, //enum is created to restrict the values of a field
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
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

//let say i want to find a user by 1st & last name, just create a schema
userSchema.index({ firstname: 1, lastname: 1 });

// Method to get JWT token for the user for authentication , we have created this function to get the JWT token for the user as it will help un authenticating the user so that we dont need to find the user in the db again and again. Don't use arrow fun beacuse is will not work with 'this' keyword
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
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
