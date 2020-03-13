const mongoose = require("mongoose");

// Define Exam
const examSchema = new Schema({
  Name: { type: String, required: true },
  Date: Date
});
// Define Subject Schema
const subjectSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  ID: Number,
  Level: Number,
  Teacher: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
  Exam: [examSchema]
});

// Compile our Model based on the Schema
const Subject = mongoose.model("Subject", subjectSchema);

// Export our Model for use
module.exports = Subject;
