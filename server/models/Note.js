 const mongoose = require('mongoose');

 const note = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
 },{timestamps: true});
const Note = mongoose.model("Note",note);
module.exports = Note;