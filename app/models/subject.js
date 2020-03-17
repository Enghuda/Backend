/* // Require necessary NPM packages
const mongoose = require("mongoose");

// Define Exam Schema
const examSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Date: { type: String}
},
{
  timestamps: true
}
); */
// Define Subject Schema


const mongoose = require("mongoose");

const { examSchema } = require("./exam");



// Define Subject Schema

const subjectSchema = new mongoose.Schema({

  Name: { type: String, required: true },
  SubjectCode: { type: Number, unique: true, strict: true },
  Level: Number,

  Teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],

  Exam: [examSchema]

});



// Compile our Model based on the Schema

const Subject = mongoose.model('Subject', subjectSchema);



// Export our Model for use
module.exports = {Subject, Exam};
