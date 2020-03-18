// require npm packages
const express = require('express');
const {Student, Attendance} = require('../models/student');

const router = express.Router();
/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /api/students
 * Description:   Get All Students
 */
router.get('/api/students',(req,res)=>{
    Student.find()
        .then((students)=>{
            res.status(200).json({students:students})
        })
        .catch((error)=>{
            res.status(500).json({error:error})
        });
});
/**
 * Action:        SHOW
 * Method:        GET
 * URI:           /api/students/id
 * Description:   Get one students by id
 */

router.get('/api/students/:id',(req,res)=>{
    Student.findById(req.params.id)
        .then((student)=>{
            if (student){
    res.status(200).json({student: student});
}
else {
    res.status(404).json({error:{
            name:'Documentnotfound',
            message:'The provided ID does not found'
        }})
}

})
.catch((error)=>{
    res.status(500).json({error:error});
})
})
/**
 * Action:        CREATE
 * Method:        POST
 * URI:           /api/student
 * Description:   create new student
 */
router.post("/api/students",(req,res)=>{
    Student.create(req.body.student)
        .then((newStudent)=>{
            res.status(201).json({student:newStudent})
        })
        .catch((error)=>{
            res.status(500).json({error:error});
        })
})
/**
 * Action:        UPDATE
 * Method:        PATCH
 * URI:           /api/student/id
 * Description:   create new student
 */
router.patch('/api/students/:id',(req,res)=>{
    Student.findById(req.params.id)
        .then((student)=>{
            if(student){
                return student.update(req.body.student)

            }
            else {
                res.status(404).json({
                    error:{
                        name:'DocumnetNotFoundError',
                        message:'the provide id doesnt match any documnets'
                    }
                })
            }


        })
        .then(() => {
            res.status(204).end();
        })
        .catch((error)=>{
            res.status(500).json({error:error})
        })
});

/**
 * Action:        DESTROY
 * Method:        DELETE
 * URI:           /api/students/id
 * Description:   delete student by id
 */

router.delete('/api/students/:id',(req,res)=>{
    Student.findById(req.params.id)
        .then((student)=>{
            if (student){
                return student.remove();
            }
            else  {
                res.status(404).json({error:{
                        name:'DocumentNotFound',
                        message:'The provided ID does not found'
                    }})
            }
        }).then(()=>{
        res.status(204).end();
    })

        .catch((error)=>{
            res.status(500).json({error:error})
        })
});

// * Action:       CREATE
// * Method:       POST
// * URI:          /api/students/:studentId/attendance
// * Description:  Create new attendance
// */
router.post('/api/students/:studentId/attendance', (req, res) => {
//    console.log('Req',req.body);
  let attendance = new Attendance (req.body.attendance)
  console.log(attendance);
  //find student by id
  Student.findById(req.params.studentId, (error, atten) => {
    //add new attendance
    atten.Attendance.push(attendance);
    atten.save((error, saveAttendance) => {
      res.json(saveAttendance);
    })
  })
});
/**
* Action:      SHOW
* Method:      GET
* URI:         /api/students/5e71e92d0bfeca7f91ddfb7d/attendance
* Description: get all attendance 
*/
router.get('/api/students/:studentId/attendance', (req, res) => {
    Student.findById(req.params.studentId)
      .then((student) => {
        if (student) {
          res.status(200).json({ attendance: student.Attendance});
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
* URI:       api/students/5e70864b4dcf5a4278b3fa0e/attendance/5e70868f4dcf5a4278b3fa0f
* Description: get attandence By ID
*/
// req.params.NAME
router.get('/api/students/:studentId/attendance/:attendanceId', (req, res) => {
    console.log("params:", req.params);
    Student.findById(req.params.studentId)
      .then((student) => {
        let findedAttendance;
        if (student) {
          for (let i = 0; i < student.Attendance.length; i++) {
            const oneAttendanceObj = student.Attendance[i];
            if (oneAttendanceObj._id.toString() === req.params.attendanceId) {
              console.log('heeeeeey I find it');
              findedAttendance=oneAttendanceObj
            }
          }
          console.log("finish")
          res.status(200).json({attendance:findedAttendance});
  
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
 * URI:         /api/students/5e70a6134cdb4c3fb4b20b8a/attendance/5e70ab7b8158195458845d38
 * Description: Update attendance by attendance ID
 */
router.patch('/api/students/:studentId/attendance/:attendanceId', (req, res) => {
    console.log("params:", req.params);
    const attendanceInfo =req.body.Attendance
    //find s by id  
    Student.findById(req.params.studentId)
      .then((student) => {
        let findedAttendance;
        console.log(student);
        if (student) {
          for (let i = 0; i < student.Attendance.length; i++) {
            const oneAttendanceObj = student.Attendance[i];
            if (oneAttendanceObj._id.toString() === req.params.attendanceId) {
              console.log('heeeeeey I find it');
              oneAttendanceObj.IsPresent=attendanceInfo.IsPresent
              
              findedAttendance = oneAttendanceObj
              // console.log(findedAttendance);
            }

          }

        student.save()
          res.status(200).json(findedAttendance);
  
        } else {
          res.status(404).json({
            error: {
              name: 'Attendance NotFound Error',
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
  * URI:          /api/students/5e7113020443183fec141fbb/attendance
  * Description:  Delete attendance
  */
  router.delete('/api/students/:studentId/attendance', (req, res) => {
    Student.findById(req.params.studentId)
      .then((students) => {
        students.pop()
        studentss.save()
        res.json({ students: students })
      })
  });
  
module.exports = router;