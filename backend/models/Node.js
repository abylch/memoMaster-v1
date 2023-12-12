const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: String,
  title: String,
  content: String,
  time: String,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
