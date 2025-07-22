//here we are validating the data from the user by using validator library
const validator = require("validator");

const validateSignUpData = (req) => {
  //validate data, take out all the filed from req.body
  const { firstname, lastname, emailId, password } = req.body;
  //1 by 1 validate everything

  if (!firstname || !lastname) {
    throw new Error("Name is not valid");
  }
  //  if (firstname.length < 4 || firstname.length > 20) {
  //   throw new Error("firstname should be beterrn 4-20 words");
  // }
  else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(" Password is not strong");
  }
};

const validateEditProfileData = (req) => {
  //const {skills,age,gender,photoUrl,about,password} = req.body;
  const allowedEditFields = [
    "firstname",
    "lastname",
    "skills",
    "age",
    "gender",
    "photoUrl",
    "about",
    "password",
  ];
  //loop through these allowed fields
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
