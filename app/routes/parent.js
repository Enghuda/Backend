// Require necessary NPM packages
const express = require("express");
// Require Mongoose Model for Parent
const Parent = require("../models/parent");
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
// it will also set `res.parentUser`
const requireToken = passport.authenticate("bearer", { session: false });
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:        Create
 * Method:        Post
 * URI:           /api/register
 * Description:    Create A new parentUser
 */
router.post("/api/registerParent", async (req, res) => {
  try {
    //salt and hashedpass generate hash password from the provided password
    const salt = await bcrypt.genSalt();
    const hashedpass = await bcrypt.hash(req.body.parent.Password, salt);
    //Create parentUserin Parent DB
    const parentUser = {
      Name: req.body.parent.Name,
      Password: hashedpass,
      Email: req.body.parent.Email,
      Gender: req.body.parent.Gender,
      Phone: req.body.parent.Phone
    };
    //Create parentUser with provided email and hashed password
    Parent.create(parentUser)
      // On a successful `create` action, respond with 201
      // HTTP status and the content of the post Req.
      .then(newParent => {
        console.log("register page", newParent) ;
        // res.status(201).json({ parent : newParent._id });
        res.status(201).json({ newParent });
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
 * Action:        Check parentUser
 * Method:        Post
 * URI:           /api/login
 * Description:    check if the parentUserin the DB
 */

//login
router.post("/api/login", async (req, res) => {
  //ES6
  const email = req.body.Email;
  const pw = req.body.Password;
  let parentUser;
  Parent.findOne({ Email: email })
    .then(record => {
      // if we didn't find a parentUser with that email, send 401
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
        parentUser.token = token;
        // save the token to the DB as a property on parentUser
        return parentUser.save();
        // if the passwords matched
        //res.send("success");
        // the token will be a 16 byte random hex string
        // const mytoken = crypto.randomBytes(16).toString("hex");
        //Create and assign a token
        // const token = jwt.sign({ parentUser }, process.env.TOKEN_SECRET);
        // res.header("auth-token", token).send(token);
        // res.status(201).json({ parentUser });
      }
    })
    .then(parentUser => {
      // return status 201, the email, and the new token
      res.status(201).json({ parentUser:parentUser});
    })
    // Catch any errors that might occur
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

router.delete("/api/logout", requireToken, (req, res, next) => {
  // create a new random token for the parentUser invalidating the current one
  req.parentUser.token = crypto.randomBytes(16);
  // save the token and respond with 204
  req.parentUser.save()
    .then(() => res.sendStatus(204))
    .catch(next);
});


//Export the router so we can use it in the server.js file
module.exports = router;
