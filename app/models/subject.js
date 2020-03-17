
const mongoose = require("mongoose");
const examSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    date: { type: String }
  },
  {
    timestamps: true
  }
);
const Exam = mongoose.model("Exam", examSchema);
// Define Subject Schema
const subjectSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  SubjectCode: Number,
  Level: Number,
  Teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
  Exam: [examSchema]
});
// Compile our Model based on the Schema
const Subject = mongoose.model('Subject', subjectSchema);
// Export our Model for use
module.exports = {Subject, Exam };
