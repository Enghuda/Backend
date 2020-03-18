const mongoose = require("mongoose");

// Define Admin Schema
const userSchema = new mongoose.Schema(
  {
    token: String,
    Name: { type: String, required: true },
    Email: { type: String, strict: true, required: true, unique: true },
    Password: { type: String, required: true },
    Gender: String,
    date: { type: Date, default: Date.now },
    Phone: { type: Number, required: true },
    Subject: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }]
  },
  {
    timestamps: true
  }
);

// Compile our Model based on the Schema
const User = mongoose.model("User", userSchema);

// Export our Model for use
module.exports = User;
