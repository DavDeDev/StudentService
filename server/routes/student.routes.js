// Import necessary modules and models
const express = require('express');
const router = express.Router();
const {
  isStudentLoggedIn,
  signup,
  login,
  addCourse,
  updateCourse,
  dropCourse,
  listCourses
} = require('../controllers/student.controller');

router.route('/:studentId/courses')
  .post(addCourse)
  .get(listCourses);

router.route('/:studentId/courses/:courseId')
  .put(isStudentLoggedIn, updateCourse)
  .delete(isStudentLoggedIn, dropCourse);

router.post('/signup', signup);
router.post('/login', login);


module.exports = router;
