// Import necessary modules and models
const express = require('express');
const router = express.Router();
const {
  addCourse,
  updateCourse,
  dropCourse,
  listCourses
} = require('../controllers/student.controller');

// Add a course for a student
router.post('/students/:studentId/courses', addCourse);

// Update a course for a student
router.put('/students/:studentId/courses/:courseId', updateCourse);

// Drop a course for a student
router.delete('/students/:studentId/courses/:courseId', dropCourse);

// List all courses taken by a student
router.get('/students/:studentId/courses', listCourses);

module.exports = router;
