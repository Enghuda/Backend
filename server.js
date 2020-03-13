// Require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');

// Require Route Files
const subjectRouter = require('./app/routes/subjects');



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

// Add `bodyParser` middleware which will parse JSON requests
// into JS objects before they reach the route files.
//
// The method `.use` sets up middleware for the Express application
app.use(express.json());


/*** Routes ***/

// Mount imported Routers
app.use(subjectRouter);



// Start the server to listen for requests on a given port
app.listen(port, () => {
  console.log(`SchoolApp is listening on port ${port}`);
});