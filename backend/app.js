require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const jobRouter = require("./routes/jobRouter");
const userRouter = require("./routes/userRouter");

const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  connectDB();
}
 
// Use the jobRouter for all "/jobs" routes
app.use("/api/jobs", jobRouter);
app.use("/api", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
