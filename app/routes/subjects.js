// Require necessary NPM packages
const express = require('express');

// Require Mongoose Model for Subject
// const Subject = require('../models/subject');
const { Subject } = require("../models/subject");
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

/**
* Action:       CREATE
* Method:       POST
* URI:          /api//subjects
* Description:  Create a new Subject
*/

// router.post('/api/subjects', (req, res) => {
//   Subject.create(req.body.subject)
//   // On a successful `create` action, respond with 201
//   // HTTP status and the content of the new subject.
//   .then((newSubject) => {
//     res.status(201).json({ subject: newSubject});
//   })
//   // Catch any errors that might occur
//   .catch((error) => {
//     res.status(500).json({ error: error });
//   });
// });
router.post("/api/AddNewSub", (req, res) => {
  Subject.create(req.body.subject)
    // On a successful `create` action, respond with 201
    // HTTP status and the content of the new subject.
    .then(newSubject => {
      res.status(201).json({ subject: newSubject });
    })
    // Catch any errors that might occur
    .catch(error => {
      if (error.code === 11000) {
        res.json("this subject already Exist");
      } else {
        // res.json(error.code)
        res.status(500).json({ error: error });
      }
    });
});

/**
 * Action:        SHOW
 * Method:        GET
 * URI:           /api/subjectS/5e6b775079d88c247a7ae76a
 * Description:   Get An Subject by Subject ID
 */
router.get('/api/subjects/:id', (req, res) => {
  Subject.findById(req.params.id)
  .then((subject) => {
    if (subject) {
      res.status(200).json({ subject: subject });
    } else {
      // If we couldn't find a document with the matching ID
      res.status(404).json({
        error: {
          name: 'DocumentNotFoundError',
          message: 'The provided ID doesn\'t match any documents'
        }
      });
    }
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  })
});



/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /api/subjects/5e6b775079d88c247a7ae76a
 * Description: Update An Subject by Subject ID
 */
router.patch('/api/subjects/:id', (req, res) => {
  Subject.findById(req.params.id)
    .then((subject) => {
      if(subject) {
        // Pass the result of Mongoose's `.update` method to the next `.then`
        return subject.update(req.body.subject);
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID doesn\'t match any documents'
          }
        });
      }
    })
    .then(() => {
      // If the update succeeded, return 204 and no JSON
      res.status(204).end();
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

/**
* Action:       DESTROY
* Method:       DELETE
* URI:          /api/subjects/5e6b787379d88c247a7ae76c
* Description:  Delete An Subject by Subject ID
*/
router.delete('/api/subjects/:id', (req, res) => {
  Subject.findById(req.params.id)
  .then((subject) => {
    if (subject) {
      // Pass the result of Mongoose's `.delete` method to the next `.then`
      return subject.remove();
    } else {
      // If we couldn't find a document with the matching ID
      res.status(404).json({
        error: {
          name: 'DocumentNotFoundError',
          message: 'The provided ID Doesn\'t match any documents'
        }
      });
    }
  })
  .then(() => {
    // If the deletion succeeded, return 204 and no JSON
    res.status(204).end();
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});

// Export the Router so we can use it in the server.js file
module.exports = router;
