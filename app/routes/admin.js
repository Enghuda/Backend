// Require necessary NPM packages
const express = require("express");
// Require Mongoose Model for Admin
const User = require("../models/admin");
const Sub = require("../models/subject");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Passport docs: http://www.passportjs.org/docs/
const passport = require("passport");
const crypto = require("crypto");
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js

// see above for explanation of "salting", 10 rounds is recommended
// const bcryptSaltRounds = 10;

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate("bearer", { session: false });
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
      Phone: req.body.admin.Phone
    };
    //Create user with provided email and hashed password
    User.create(user)
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
  User.findOne({ Email: email })
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
      user = record;
      return bcrypt.compare(pw, record.Password);
    })
    .then(correctPassword => {
      if (!correctPassword) {
        // if the passwords not matched
        res.status(500).json("error not allowed pass dont match with Email");
      } else {
        // the token will be a 16 byte random hex string
        const token = crypto.randomBytes(16).toString("hex");
        user.token = token;
        // save the token to the DB as a property on user
        return user.save();
        // if the passwords matched
        //res.send("success");
        // the token will be a 16 byte random hex string
        // const mytoken = crypto.randomBytes(16).toString("hex");
        //Create and assign a token
        // const token = jwt.sign({ user }, process.env.TOKEN_SECRET);
        // res.header("auth-token", token).send(token);
        // res.status(201).json({ user });
      }
    })
    .then(user => {
      // return status 201, the email, and the new token
      res.status(201).json({ user: user });
    })
    // Catch any errors that might occur
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

router.delete("/api/logout", requireToken, (req, res, next) => {
  // create a new random token for the user, invalidating the current one
  req.user.token = crypto.randomBytes(16);
  // save the token and respond with 204
  req.user.save()
    .then(() => res.sendStatus(204))
    .catch(next);
});


//Export the router so we can use it in the server.js file
module.exports = router;
