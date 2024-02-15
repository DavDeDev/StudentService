// Import necessary modules and models
const express = require('express');
const router = express.Router();
const { isStudent } = require('../controllers/auth.controller');
const {
  addCourse,
  updateCourse,
  dropCourse,
  listCourses
} = require('../controllers/student.controller');

// Add a course for a student
router.post('/students/:studentId/courses',isStudent, addCourse);

// Update a course for a student
router.put('/students/:studentId/courses/:courseId',isStudent, updateCourse);

// Drop a course for a student
router.delete('/students/:studentId/courses/:courseId',isStudent, dropCourse);

// List all courses taken by a student
router.get('/students/:studentId/courses',isStudent, listCourses);

module.exports = router;
