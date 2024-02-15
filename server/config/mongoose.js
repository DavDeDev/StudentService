// Load the module dependencies:
//  config.js module and mongoose module
var mongoose = require('mongoose');
// Define the Mongoose configuration method
module.exports = function () {
  // Use Mongoose to connect to MongoDB
  const db = mongoose.connect("mongodb://0.0.0.0:27017/COMP308").then(() => console.log('DB Connected!'))
    .catch(err => {
      console.log('Error', err);
    });

  require('../models/student.model');
  require('../models/course.model');
  // Return the Mongoose connection instance
  return db;
};