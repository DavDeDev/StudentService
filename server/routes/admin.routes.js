// Import necessary modules and dependencies
const { addStudent, listStudents, listCourses, listStudentsByCourse } = require('../controllers/admin.controller');
const { isAdmin } = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

// Add a student
router.post('/students', isAdmin, addStudent);

// List all students
router.get('/students', isAdmin, listStudents);

// List all courses
router.get('/courses', isAdmin, listCourses);

// List all students taking a specific course
router.get('/courses/:courseId/students', isAdmin, listStudentsByCourse);

// Export the router
module.exports = router;
