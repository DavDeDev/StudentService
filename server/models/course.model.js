const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  sections: [{
    sectionName: { type: String, required: true, unique: true},
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  }],
  semester: String,
});

module.exports = mongoose.model('Course', courseSchema);
