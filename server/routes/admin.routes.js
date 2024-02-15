// Import necessary modules and dependencies
const {addStudent, listStudents, listCourses, listStudentsByCourse} = require('../controllers/admin.controller');
const express = require('express');
const router = express.Router();

// Add a student
router.post('/students', addStudent);

// List all students
router.get('/students', listStudents);

// List all courses
router.get('/courses', listCourses);

// List all students taking a specific course
router.get('/courses/:courseId/students', listStudentsByCourse);

// Export the router
module.exports = router;
