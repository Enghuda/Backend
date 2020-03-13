// Require necessary NPM packages
const express = require('express');

// Require Mongoose Model for Article
const Subject = require('../models/subject');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();


/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /api/courses
 * Description:   Get All Subjects
 */
router.get('/api/subjects', (req, res) => {
  Subject.find()
  // Return all Subjects as an Array
  .then((allSubjects) => {
    res.status(200).json({ subjects: allSubjects});
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});

// Export the Router so we can use it in the server.js file
module.exports = router;