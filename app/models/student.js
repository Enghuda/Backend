const mongoose = require("mongoose");

// Define Student Schema
const studentSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  ID: Number,
  Gender: String,
  DOB: Date,
  subject: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }]
});

// Compile our Model based on the Schema
const Student = mongoose.model('Student', studentSchema);

// Export our Model for use
module.exports = Student;
