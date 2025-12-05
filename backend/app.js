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

connectDB();
app.use("/api/jobs", jobRouter);
app.use("/api/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
