// require npm packages
const express = require('express');
const Student = require('../models/student');
const {authToken} = require('./verfiyToken');

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
    console.log("-------------------------");
    console.log(req.body);
    console.log("-------------------------");
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
module.exports = router;