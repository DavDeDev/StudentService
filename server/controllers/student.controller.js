// Import necessary modules and models
const Student = require('../models/student.model');
const Course = require('../models/course.model');


// Add a course for a student
const addCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student || !course) {
      return res.status(404).json({ error: 'Student or course not found' });
    }
    student.courses.push(course);
    await student.save();
    res.status(200).json({ message: 'Course added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add course' });
  }
};

// Update a course for a student
const updateCourse = async (req, res) => {
  try {
    const { studentId, courseId, section } = req.body;
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student || !course) {
      return res.status(404).json({ error: 'Student or course not found' });
    }
    const courseIndex = student.courses.findIndex((c) => c._id.toString() === courseId);
    if (courseIndex === -1) {
      return res.status(404).json({ error: 'Course not found for the student' });
    }
    student.courses[courseIndex].section = section;
    await student.save();
    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
};

// Drop a course for a student
const dropCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student || !course) {
      return res.status(404).json({ error: 'Student or course not found' });
    }
    student.courses = student.courses.filter((c) => c._id.toString() !== courseId);
    await student.save();
    res.status(200).json({ message: 'Course dropped successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to drop course' });
  }
};

// List all courses taken by a student
const listCourses = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate('courses');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ courses: student.courses });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list courses' });
  }
};

module.exports = {
  addCourse,
  updateCourse,
  dropCourse,
  listCourses,
};
