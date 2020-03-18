const mongoose = require("mongoose");

// Define Parent Schema
const parentSchema = new mongoose.Schema(
  {
    token: String,
    Name: { type: String, required: true },
    Email: { type: String, strict: true, required: true, unique: true },
    Password: { type: String, required: true },
    Gender: String,
    Date: { type: Date, default: Date.now },
    Phone: { type: Number, required: true },
    Student: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
  },
  {
    timestamps: true
  }
);

// Compile our Model based on the Schema
const Parent = mongoose.model("Parent", parentSchema);

// Export our Model for use
module.exports = Parent;
