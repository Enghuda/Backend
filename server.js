// Require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Require Route Files
const subjectRouter = require('./app/routes/subjects');
const indexRouter = require("./app/routes/index");
const adminRouter = require("./app/routes/admin");
const studentRouter = require('./app/routes/students');
// Require DB Configuration File
const db = require('./config/db');

// Establish Database Connection
/* mongoose.set("useCreateIndex", true);
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Mongo');
}); */
// establish database connection
mongoose.Promise = global.Promise;
mongoose.connect(db, {
  useMongoClient: true
});
// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on
const port = process.env.PORT || 5000;
const reactPort = 3000;

/*** Middleware ***/

// Add `bodyParser` middleware which will parse JSON requests
// into JS objects before they reach the route files.

//
// The method `.use` sets up middleware for the Express application
app.use(express.json());

// Set CORS headers on response from this API using the `cors` NPM package.
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}` }))


app.use(indexRouter);
app.use(adminRouter);
///Mid auth
// require configured passport authentication middleware
const auth = require('./auth/auth');

// required middleware to log requests
const requestLogger = require('./auth/request_logger');

// require middleware for accepting token or bearer
const tokenOrBearer = require('./auth/token_or_bearer');


/*** Routes ***/
// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token <token>` OR the Express convention of
// `Authorization: Bearer <token>`
// add request logger to create server log

// Mount imported Routers
app.use(subjectRouter);
app.use(studentRouter);
app.use(requestLogger)
app.use(tokenOrBearer)

// register passport authentication middleware
app.use(auth)

// Start the server to listen for requests on a given port
app.listen(port, () => {
  console.log(`SchoolApp is listening on port ${port}`);
});