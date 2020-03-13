const mongoose = require("mongoose");

// Define Admin Schema
const adminSchema = new mongoose.Schema({
  ID: Number,
  Name: { type: String, required: true },
  Email: { type: string, required: true },
  Password: { type: String, required: true },
  Gender: { type: Boolean, default: true },
  Subject: [SubID]
});

// Compile our Model based on the Schema
const Admin = mongoose.model("Admin", adminSchema);

// Export our Model for use
module.exports = Admin;
