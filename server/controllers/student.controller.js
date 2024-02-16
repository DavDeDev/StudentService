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
  const { studentId, courseCode, sectionName } = req.body;

  try {
    // Find the course based on courseId
    const course = await Course.findOne({ courseCode });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const section = course.sections.find(sec => sec.sectionName === sectionName);

    if (!section) {
      return res.status(404).json({ error: 'Section not found in the course' });
    }

    // Check if the student is already enrolled in any section of the course
    const isEnrolledInCourse = course.sections.some(sec => sec.students.includes(studentId));

    if (isEnrolledInCourse) {
      // Check if the section exists in the course

      // Check if the student is already in the section
      if (section.students.includes(studentId)) {
        return res.status(400).json({ error: 'Student is already enrolled in the section' });
      }
      return res.status(400).json({ error: 'Student is already enrolled in another section of the course' });
    }


    // Add the student to the section
    section.students.push(studentId);

    // Save the updated course
    await course.save();

    res.status(200).json({ message: 'Student successfully added to the section' });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
  console.log("❌ dropCourse")
  const { studentId, courseId } = req.params;
  console.log(studentId)
  console.log(courseId)

  try {
    // Validate that studentId and courseId are valid
    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: 'Invalid studentId or courseId' });
    }

    const student = await Student.findById(studentId);
    console.log(student)
    // Find the course based on courseId
    const course = await Course.findById(courseId);
    console.log(course)
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if the student is enrolled in the course
    const sectionWithStudent = course.sections.find(section => section.students.includes(studentId));

    if (!sectionWithStudent) {
      return res.status(400).json({ error: 'Student is not enrolled in the course' });
    }

    // Remove the student from the course
    sectionWithStudent.students = sectionWithStudent.students.filter(id => id.toString() !== studentId);

    // Save the updated course
    await course.save();

    res.status(200).json({ message: 'Course dropped successfully' });
  } catch (error) {
    console.error('Error dropping course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// List all courses taken by a student
const listCourses = async (req, res) => {
  console.log("listCourses")
  const { studentId } = req.params;
  console.log(studentId)
  try {
    // Find all courses where the student is present
    const courses = await Course.find({ 'sections.students': new mongoose.Types.ObjectId(studentId) });

    // Extract and return courses with section numbers
    const coursesWithSections = courses.map(course => {
      const sectionWithStudent = course.sections.find(section => section.students.includes(studentId));

      return {
        courseId: course._id,
        courseCode: course.courseCode,
        courseName: course.courseName,
        section: sectionWithStudent.sectionName,
        semester: course.semester,
        numOfStudents: sectionWithStudent.students.length
      };
    });

    console.log(coursesWithSections);

    // Send the response
    res.status(200).json({ courses: coursesWithSections });
  } catch (error) {
    console.error('Error finding sections:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



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
