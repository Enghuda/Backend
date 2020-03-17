
// Require necessary NPM packages

const mongoose = require("mongoose");

const { subjectSchema } = require("./subject");


// Define Exam Schema

const examSchema = new mongoose.Schema({

  Name: { type: String, required: true },

  date: { type: String }

},

  {

    timestamps: true

  }

);

const Exam = mongoose.model('Exam', examSchema);

module.exports = { Exam, examSchema };

