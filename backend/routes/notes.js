const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTER:01 get All the notes using: GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try{
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }  
});

//ROUTER:02 :Add a new Note using:- POST "/api/notes/addnote". login required
router.post("/addnote",fetchuser,[
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 charecters").isLength({ min: 5 })], async (req, res) =>
    {
        try{
            const {title, description, tag} = req.body;
                // If there are errors, return Bad request and the errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
                }
                const note = new Notes({
                    title, description, tag, user : req.user.id
                })
                const saveNote = await note.save();
                res.json(saveNote);
        }catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
          } 
  }
);

module.exports = router;
