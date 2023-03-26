const Note = require("../models/Note");
const getNotes = async (req,res) => {
    // console.log(req.user);
    const notes = await Note.find({user:req.user._id});
    res.json(notes);
}
const getNoteById = async (req,res) => {
    const note = await Note.findById(req.params.id);
    if (note) {
        res.json(note);
    }else{
        res.status(404).json({message:"Note not Found"});
    }
};
const createNote = async (req,res) => {
    const {title,content,category} = req.body;
    if(!title || !content || !category){
        res.status(400).json({message:"Please Fill all the feilds"}); 
    }else{
        const note = new Note({user:req.user._id,title,content,category});
        const createdNote = await note.save();
        res.status(201).json(createdNote);
    }
};
const deleteNote = async (req,res) => {
    const note = await Note.findById(req.params.id);
    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401).json({message:"You can't perform this action"});
    }
    if (note) {
        await note.remove();
        res.json({ message: "Note Removed" });
    } else {
        res.status(404).json({ message: "Note not Found" });
        // throw new Error("Note not Found");
    }
};
const updateNote = async (req, res) => {
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id);
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401).json({message:"You can't perform this action"});
    //   throw new Error("You can't perform this action");
    }
    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404).json({message:"Note not found"});
    //   throw new Error("Note not found");
    }
};

module.exports = {getNotes,getNoteById,createNote,deleteNote,updateNote};
