// Require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');

const studentRouter = require('./app/routes/students');



// Require DB Configuration File
const db = require('./config/db');

// Establish Database Connection
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Mongo');
});

// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on
const port = process.env.PORT || 5000;

/*** Middleware ***/
app.use(express.json());

/*** Routes ***/
app.use(studentRouter);


// Start the server to listen for requests on a given port
app.listen(port, () => {
  console.log(`SchoolApp is listening on port ${port}`);
});