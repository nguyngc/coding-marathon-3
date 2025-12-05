const mongoose = require("mongoose");

module.exports = async () => {
  try {
    if (mongoose.connection.readyState) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }

    if (global.__MONGO__) {
      await global.__MONGO__.stop();
    }
  } catch (e) {}
};
