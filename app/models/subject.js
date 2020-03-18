// Require necessary NPM packages
const mongoose = require("mongoose");

// Define Exam Schema
const examSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Date: Date
});
// Define Subject Schema
const subjectSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  SubjectCode: { type: Number, unique: true, strict: true },
  Level: Number,
  Teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
  Exam: []
});


// Compile our Model based on the Schema
const Subject = mongoose.model('Subject', subjectSchema);
const Exam = mongoose.model('Exam', examSchema );


// Export our Model for use
module.exports = {Subject, Exam};