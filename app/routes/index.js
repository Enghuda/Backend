//Require necessary NPM Packages
const express = require("express");

//Instantiate a router (mini app that only handles routes)???????/
const router = express.Router();

/* 
Action :...... Index
Method:.......Get
URI:......./
Description:Get the Root Route
*/
router.get("/", (req, res) => {
  res.json({ message: "welcome to school app" });
});
//Export the router so we can use it in the server.js file
module.exports = router;
