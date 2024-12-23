const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTER:01 :- get All the notes using: GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try{
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }  
});
//ROUTER:02 :- Add a new Note using:- POST "/api/notes/addnote". login required
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

//ROUTER:03 :- Update an existing Note using:- PUT "/api/notes/updatenote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try{
        //Create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        //Find the note to be update and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(401).send("Not Found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note});
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }     
});

//ROUTER:04 :- Delete an existing Note using:- DELETE "/api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try{
        //Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(401).send("Not Found")}

        //Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deletes", note: note});
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }     
});
module.exports = router;
