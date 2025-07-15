const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app = express();
const port = 4000;

app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.get("/admin/getAll", adminAuth, (req, res) => {
  res.send("All data deleted");
});
app.get("/user/sher", userAuth, (req, res) => {
  res.send("Sher has all data ");
});
app.get("/user/getAll", userAuth, (req, res) => {
  res.send("All data deleted");
});

//error handling
// app.get("/getuserdata", (req, res) => {
//   try {

//     res.send("User data sent");
//   } catch (error) {
//     res.status(401).send("Error occured");
//   }
// });

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something went wrong . . .");
//   }
// });

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
