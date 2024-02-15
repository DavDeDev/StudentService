const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: String,
  city: String,
  phoneNumber: String,
  email: { type: String, required: true },
  program: String,
  favoriteTopic: String,
  strongestTechnicalSkill: String,
});

module.exports = mongoose.model('Student', studentSchema);