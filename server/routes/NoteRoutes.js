const express = require("express");
const router = express.Router();
const {getNotes,getNoteById,createNote,deleteNote,updateNote} = require("./../controllers/NoteController");
const {isAuth} = require("./../middlewares/authMiddleware");
router.route("/").get(isAuth,getNotes);
router.route('/:id')
    .get(getNoteById)
    .put(isAuth,updateNote)
    .delete(isAuth,deleteNote);
router.route("/create")
    .post(isAuth,createNote);
module.exports =  router;





