require("dotenv").config();
const userRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const errorHandler = require("./middleware/errorHandler");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/user", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
