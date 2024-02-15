const express = require('express');
const router = express.Router();
const { isAdmin } = require('../controllers/auth.controller');
const adminController = require('../controllers/admin.controller');

// Add a student
router.post('/students', isAdmin, adminController.addStudent);

// List all students
router.get('/students', isAdmin, adminController.listStudents);

// List all courses
router.get('/courses', isAdmin, adminController.listCourses);

// List all students taking a specific course
router.get('/courses/:courseId/students', isAdmin, adminController.listStudentsByCourse);

module.exports = router;
