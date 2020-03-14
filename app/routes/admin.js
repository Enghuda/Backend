// Require necessary NPM packages
const express = require("express");
// Require Mongoose Model for Admin
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authToken } = require("./verfiyToken"); 
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
      Gender: req.body.admin.Gender,
      Phone: req.body.admin.Phone,
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

/**
 * Action:        Check User
 * Method:        Post
 * URI:           /api/login
 * Description:    check if the User in the DB
 */

//login
router.post("/api/login", async (req, res) => {
  //ES6
  const email = req.body.Email;
  const pw = req.body.Password;
  let user;
  Admin.findOne({ Email: email })
    .then(record => {
      // if we didn't find a user with that email, send 401
      if (!record) {
        // If we couldn't find a document with the matching Email
        res.status(404).json({
          error: {
            name: "DocumentNotFoundError",
            message: "The provided Email  is not registered"
          }
        });
      }
      user = record._id;
      return bcrypt.compare(pw, record.Password);
    })
    .then(correctPassword => {
      if (!correctPassword) {
        // if the passwords not matched
        res.status(500).json("error not allowed pass dont match with Email");
      } else {
        // if the passwords matched
        //res.send("success");
        // the token will be a 16 byte random hex string
        // const mytoken = crypto.randomBytes(16).toString("hex");
        //Create and assign a token
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send(token);
        // res.status(201).json({ user });
      }
    });
});

//Export the router so we can use it in the server.js file
module.exports = router;