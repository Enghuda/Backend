// Require necessary NPM packages
const mongoose = require("mongoose");


// Define attendance Schema 
const attendanceSchema = new mongoose.Schema({
  IsPresent: {type: Boolean, default: true},
  Date: Date

});

// Define Student Schema
const studentSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  ID: Number,
  Gender: String,
  DOB: Date,
  Attendance: [],
  Subject: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }]
});

// Compile our Model based on the Schema
const Student = mongoose.model('Student', studentSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);


// Export our Model for use
module.exports = {Student, Attendance} ;
