// Require necessary NPM packages
const express = require("express");
// Require Mongoose Model for Admin
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:        Create
 * Method:        Post
 * URI:           /api/register
 * Description:    Create A new User
 */
router.post("/api/register", async (req, res) => {
  try {
    //salt and hashedpass generate hash password from the provided password
    const salt = await bcrypt.genSalt();
    const hashedpass = await bcrypt.hash(req.body.admin.Password, salt);
    //Create user in Admin DB
    const user = {
      Name: req.body.admin.Name,
      Password: hashedpass,
      Email: req.body.admin.Email,
      Gender: req.body.admin.Gender
    };
    //Create user with provided email and hashed password
    Admin.create(user)
      // On a successful `create` action, respond with 201
      // HTTP status and the content of the post Req.
      .then(newAdmin => {
        console.log("register page", newAdmin);
        // res.status(201).json({ admin : newAdmin._id });
        res.status(201).json({ newAdmin });
      })
      // Catch any errors that might occur
      .catch(error => {
        if (error.code === 11000) {
          res.json("this Email already Exist");
        } else {
          // res.json(error.code)
          res.status(500).json({ error: error });
        }
      });
  } catch {
    res.status(500).send();
  }
});

//Export the router so we can use it in the server.js file
module.exports = router;