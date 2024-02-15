// Import necessary modules and models
const Student = require('../models/student.model');
const Course = require('../models/course.model');

// Add a student
const addStudent = async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const student = new Student({ name, age, email });
    await student.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add student' });
  }
};

// List all students
const listStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// List all courses
const listCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// List all students taking a specific course
const listStudentsByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const students = await Student.find({ courses: courseId });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Export the controller actions
module.exports = {
  addStudent,
  listStudents,
  listCourses,
  listStudentsByCourse,
};
