// Import necessary modules and models
const Student = require('../models/student.model');
const Course = require('../models/course.model');
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret';
const jwtExpirySeconds = 300;

// Import necessary modules and models
const mongoose = require('mongoose');


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
    const { studentNumber, courseId } = req.body;
    const student = await Student.findOne({ studentNumber: studentNumber });
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
  console.log("listCourses")
  try {
    const { studentId } = req.params;

    console.log(studentId)

    // Find the student by studentId
    const student = await Student.findById(studentId);

    console.log(student)

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Retrieve courses using the Course model based on student's ObjectId
    // const courses = await Course.find({ students: { $elemMatch: { $eq: student._id } } });
    // const courses = await Course.find({ students: mongoose.Types.ObjectId(studentId) });    // const 
    //docs = await Documents.find({category: { $elemMatch: {$eq: 'yourCategory'} }});
    //retrieve all courses
    const courses = await Course.find().populate('students');
    console.log("courses>>>>>>>>>>>>>" + courses)

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error + 'Failed to list courses' });
  }
};

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const student = new Student(req.body);
    const savedStudent = await student.save();
    const studentId = savedStudent._id; // Assuming _id is the field containing the generated ID

    console.log(studentId);
    const token = jwt.sign({ id: savedStudent._id, username: savedStudent.studentNumber }, jwtKey,
      { algorithm: 'HS256', expiresIn: jwtExpirySeconds });
    console.log('token:', token)
    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds
    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });
    //
    //res.json({status:"success", message: "user found!!!", data:{user:
    //user, token:token}});

    //call the next middleware

    // Send the studentId to the frontend
    res.status(200).json({ studentId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to sign up' });
  }
};


const login = async (req, res) => {
  try {
    console.log("login");
    const { studentNumber, password } = req.body;
    const student = await Student.findOne({ studentNumber });
    console.log(student);
    if (student && student.authenticate(password)) {
      // Authentication successful  - generate a token and send it to the client
      const token = jwt.sign({ id: student._id, username: student.studentNumber }, jwtKey,
        { algorithm: 'HS256', expiresIn: jwtExpirySeconds });
      console.log('token:', token)
      // set the cookie as the token string, with a similar max age as the token
      // here, the max age is in milliseconds
      res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });

      // You can proceed with your login logic here
      res.status(200).json({ studentId: student._id });
    } else {
      // Authentication failed
      res.status(401).json({ error: 'Invalid credentials' });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

module.exports = {
  signup,
  login,
  addCourse,
  updateCourse,
  dropCourse,
  listCourses,
};
