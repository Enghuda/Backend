// Require necessary NPM packages
const express = require("express");
// Require Mongoose Model for Subject
const { Subject, Exam } = require("../models/subject");
// const {} = require('../models/exam');
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();
/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /api/courses
 * Description:   Get All Subjects
 */
router.get("/api/subjects", (req, res) => {
  Subject.find()
    // Return all Subjects as an Array
    .then(allSubjects => {
      res.status(200).json({ subjects: allSubjects });
    })
    // Catch any errors that might occur
    .catch(error => {
      res.status(500).json({ error: error });
    });
});
/////////////////////////////////////////////////////////////
/**
 * Action:       CREATE
 * Method:       POST
 * URI:          /api//subjects
 * Description:  Create a new Subject
 */

router.post('/api/AddNewSub', (req, res) => {

  Subject.create(req.body.subject)
    // On a successful `create` action, respond with 201
    // HTTP status and the content of the new subject.
    .then((newSubject) => {
      res.status(201).json({ subject: newSubject });
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

/**
 * Action:        SHOW
 * Method:        GET
 * URI:           /api/subjectS/5e6b775079d88c247a7ae76a
 * Description:   Get An Subject by Subject ID
 */
router.get("/api/subjects/:id", (req, res) => {
  Subject.findById(req.params.id)
    .then(subject => {
      if (subject) {
        res.status(200).json({ subject: subject });
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError",
            message: "The provided ID doesn't match any documents"
          }
        });
      }
    })
    // Catch any errors that might occur
    .catch(error => {
      res.status(500).json({ error: error });
    });
});
/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /api/subjects/5e6b775079d88c247a7ae76a
 * Description: Update An Subject by Subject ID
 */
router.patch("/api/subjects/:id", (req, res) => {
  Subject.findById(req.params.id)
    .then(subject => {
      if (subject) {
        // Pass the result of Mongoose's `.update` method to the next `.then`
        return subject.update(req.body.subject);
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError",
            message: "The provided ID doesn't match any documents"
          }
        });
      }
    })
    .then(() => {
      // If the update succeeded, return 204 and no JSON
      res.status(204).end();
    })
    // Catch any errors that might occur
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

/**
 * Action:       DESTROY
 * Method:       DELETE
 * URI:          /api/subjects/5e6b787379d88c247a7ae76c
 * Description:  Delete An Subject by Subject ID
 */
router.delete("/api/subjects/:id", (req, res) => {
  Subject.findById(req.params.id)
    .then(subject => {
      if (subject) {
        // Pass the result of Mongoose's `.delete` method to the next `.then`
        return subject.remove();
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError",
            message: "The provided ID Doesn't match any documents"
          }
        });
      }
    })
    .then(() => {
      // If the deletion succeeded, return 204 and no JSON
      res.status(204).end();
    })
    // Catch any errors that might occur
    .catch(error => {
      res.status(500).json({ error: error });
    });
});
/**
* Action:       CREATE
* Method:       POST
* URI:          /api/subjects/:subjectId/exams
* Description:  Create a new exam
*/
router.post('/api/subjects/:subjectId/exams', (req, res) => {
  //  console.log('Req',req.body);
  let newExam = new Exam(req.body.newExam)
  //console.log('newExam',newExam);
  //find subject by id
  Subject.findById(req.params.subjectId, (error, foundsubject) => {
    //add new exam
    foundsubject.Exam.push(newExam);
    foundsubject.save((error, savedSubject) => {
      res.json(savedSubject);
    })
  })
});

/**
* Action:      SHOW
* Method:      GET
* URI:         /api/subjects/5e70a6134cdb4c3fb4b20b8a/exams
* Description: get Exams
*/


router.get('/api/subjects/:subjectId/exams', (req, res) => {
  Subject.findById(req.params.subjectId)
    .then((subject) => {
      if (subject) {
        res.status(200).json({ exam: subject.Exam });
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
* Action:      SHOW
* Method:      GET
* URI:       api/subjects/5e70864b4dcf5a4278b3fa0e/exams/5e70868f4dcf5a4278b3fa0f
* Description: get Exam By ID
*/
// req.params.NAME
router.get('/api/subjects/:subjectId/exams/:examId', (req, res) => {
  console.log("params:", req.params);
  Subject.findById(req.params.subjectId)
    .then((subject) => {
      let findedExam;
      if (subject) {
        for (let i = 0; i < subject.Exam.length; i++) {
          const oneExamObj = subject.Exam[i];
          if (oneExamObj._id.toString() === req.params.examId) {
            console.log('heeeeeey I find it');
            findedExam = oneExamObj
          }
        }
        console.log("finish")
        res.status(200).json({ exam: findedExam });

      } else {
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
 * URI:         /api/subjects/5e70a6134cdb4c3fb4b20b8a/exams/5e70ab7b8158195458845d38
 * Description: Update Exam by exam ID
 */
router.patch('/api/subjects/:subjectId/exams/:examId', (req, res) => {
  //console.log("params:", req.params);
  const examInfo = req.body.Exam
  //find s by id  
  Subject.findById(req.params.subjectId)
    .then((subject) => {
      let findedExam;

      if (subject) {

        for (let i = 0; i < subject.Exam.length; i++) {
          const oneExamObj = subject.Exam[i];
          if (oneExamObj._id.toString() === req.params.examId) {
            console.log('heeeeeey I find it');
            oneExamObj.Name = examInfo.Name
            findedExam = oneExamObj
          }
        }
        subject.save()
        res.status(200).json(findedExam);

      } else {
        res.status(404).json({
          error: {
            name: 'Exam NotFound Error',
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
* Action:       DESTROY
* Method:       DELETE
* URI:          /api/subjects/5e7113020443183fec141fbb/exams
* Description:  Delete Exam by ID
*/
router.delete('/api/subjects/:subjectId/exams/:examId', (req, res) => {
  const sujectid = req.params.subjectId;
  const examid = req.params.examId;
  // find exam in db by id
  Subject.findById(sujectid, (err, foundExam) => {
    foundExam.Exam.id(examid).remove();
    foundExam.save();
    res.json(foundExam);

  });

});
// Export the Router so we can use it in the server.js file
module.exports = router;