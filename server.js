// Require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const indexRouter = require("./app/routes/index");
const adminRouter = require("./app/routes/admin");
const cors = require('cors');



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
const reactPort = 3000;

/*** Middleware ***/
// The method `.use` sets up middleware for the Express application
app.use(express.json());

// Set CORS headers on response from this API using the `cors` NPM package.
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}` }))
/*** Routes ***/

app.use(indexRouter);
app.use(adminRouter);

// Start the server to listen for requests on a given port
app.listen(port, () => {
  console.log(`SchoolApp is listening on port ${port}`);
});