const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const JWT_SECRET="kya haa hai";

// Create a User using: POST "/api/auth/createuser". No login required

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("password", "Passwod must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }    
    try {
     // Check whether the user with email || userName exists already
      let user = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with the email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: secPass,
      });
      const data = {
        user:{
          id:user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      
      // res.json(user);
      res.json({authtoken});
      // Catch error
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

module.exports = router;
