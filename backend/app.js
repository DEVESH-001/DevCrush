const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//adding middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://dev-tinder-e8v7.vercel.app"], //this is used to allow cross-origin requests
    credentials: true, //this is used to allow cookies to be sent with the request
    // methods: ["GET", "POST", "PUT", "DELETE"], //allowed methods
    // allowedHeaders: ["Content-Type", "Authorization"], //allowed headers
  })
);

//importing router
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const { userRouter } = require("./routes/user");

//using the router, ("/") ->base url for all the routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//calling the connectDB fn from db.js
connectDB()
  .then(() => {
    console.log("DB connected successfully");
    //after connecting to db, server will run (good approach)
    app.listen(process.env.PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log(err, "Error connecting to DB ! ! !");
  });
