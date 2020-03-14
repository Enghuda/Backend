const mongoose = require("mongoose");

// Define Admin Schema
const adminSchema = new mongoose.Schema(
  {
    ID: Number,
    Name: { type: String, required: true },
    Email: { type: String, strict: true, required: true, unique: true },
    Password: { type: String, required: true },
    Gender: String,
    date: { type: Date, default: Date.now },
    Phone: { type: Number, required: true }
    // Subject: [{ type: Schema.Types.ObjectId, ref: "Subject" }]
  },
  {
    timestamps: true
  }
);

// Compile our Model based on the Schema
const Admin = mongoose.model("Admin", adminSchema);

// Export our Model for use
module.exports = Admin;
