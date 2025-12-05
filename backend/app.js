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
app.use(express.static('view')); // Serve static files from 'view'

if (process.env.NODE_ENV !== "test") {
  connectDB();
}
 
// Use the jobRouter for all "/jobs" routes
app.use("/api/jobs", jobRouter);
app.use("/api", userRouter);

app.use("/api", unknownEndpoint);
app.use(errorHandler);

// Fallback: for any route not handled by API or static files,
// send back index.html from the 'view' folder
app.use((req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});

module.exports = app;
