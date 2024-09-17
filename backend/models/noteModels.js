
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  note: { type: String, required: true },
});

module.exports = mongoose.model('Note', noteSchema);