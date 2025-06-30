const validator = require("validator");

const validateSignUpData = (req) => {
  //validate data, take out all the filed from req.body
  const { firstName, lastname, emailId, password } = req.body;
  //1 by 1 validate everything

  if (!firstName || !lastname) {
    throw new Error("Name is not valid" );
  }
  //  if (firstName.length < 4 || firstName.length > 20) {
  //   throw new Error("FirstName should be beterrn 4-20 words");
  // }
  else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(" Password is not strong");
  }
};

module.exports = {
  validateSignUpData,
};
