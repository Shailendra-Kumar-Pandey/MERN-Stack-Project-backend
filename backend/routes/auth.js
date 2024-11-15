const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Create a User using: POST "/api/auth/". dosen't require Auth

router.post('/',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('username','Enter a valid username').isLength({ min: 3 }),
    body('password', 'Passwod must be atleast 5 characters').isLength({ min: 5 })
],(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      }).then(user => res.json(user));
    res.send(req.body);
})

module.exports = router
