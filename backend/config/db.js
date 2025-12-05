const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);

    logger.info(`MongoDB Connected: ${conn.connection.host}`);

    return conn;
  } catch (error) {
    logger.error(error);

    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }

    throw error;
  }
};

module.exports = connectDB;
