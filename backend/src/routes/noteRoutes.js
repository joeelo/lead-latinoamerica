const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Note = require("../models/Note");

router.get("/notes/:username", async (req, res) => {
    try {
        const notes = await User.findOne({username: req.params.username})
        .populate("notes")
        .exec();
        res.send(notes.notes);
    } catch (error) {
        res.status(400).send({message: error});
    }
})

router.get("/notes/:id/view", async (req, res) => {
    try {
        const note = await Note.findOne({_id: req.params.id});
        res.send(note);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post("/notes", async (req, res) => {
    const { user, title, content } = req.body;
    const foundUser = await User.findOne({username: user.username});
    try {
        const newNote = new Note();
        newNote.user = user.id, newNote.title = title, newNote.content = content;
        newNote.save();
        foundUser.notes.push(newNote);
        foundUser.save();
        res.send({noteObject: newNote, foundUserObject: foundUser});
    } catch (error) {
        res.status(400).send({message: "rejected"});
    }
})

router.patch("/notes/:id/edit", async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = new Note();
        updatedNote.title = title;
        updatedNote.content = content;
        updatedNote._id = req.params.id // must set ID to keep from setting new ID, and must stay constant even though updated. 
        const note = await Note.findOneAndUpdate({_id: req.params.id}, updatedNote, {upsert: true, useFindAndModify: false});
        res.send(note);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete("/notes/:username/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        const user = await User.findOne({username: req.params.username});
        const noteId = note._id.toString();
        const filteredArray = user.notes.filter(userNote => userNote.toString() !== noteId);
        note.remove();
        user.notes = filteredArray;
        await user.save();
        res.send({deletedNote: note});
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;