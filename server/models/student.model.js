const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

studentSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

studentSchema.methods.authenticate = async function(password) {
  console.log('authenticating')
  return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Student', studentSchema);