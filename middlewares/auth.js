const adminAuth = (req, res, next) => {
  console.log("checking Admin is authorized...");
  const token = 1;
  const isAdminAuth = token === 1;
  if (!isAdminAuth) {
    res.status(401).send("Not Authrorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User auth is checking...");
  const token = 2;
  const isUserAdmim = token === 2;
  if (!isUserAdmim) {
    res.status(401);
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
