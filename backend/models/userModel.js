const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },            // Full name
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },        // Hashed password
    phone_number: { type: String, required: true },    // Contact number
    gender: { type: String, required: true },          // Gender
    date_of_birth: { type: Date, required: true },
    address: {
      street: { type: String, required: true },        // Street address
      city: { type: String, required: true },          // City
      zipCode: { type: String, required: true }        // Postal/ZIP code
    }
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
