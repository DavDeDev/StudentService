// Middleware function to check if the user is logged in as admin
function isAdmin(req, res, next) {
  // console.log(req);
  console.log(req.headers);
  
  // Check if the user is logged in as admin
  if (req.headers.user && req.headers.user === 'admin') {
    // User is logged in as admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not logged in as admin, redirect to /index
    res.redirect('/index');
  }
}

// Middleware function to check if the user is logged in as student
function isStudent(req, res, next) {
  // Check if the user is logged in as student
  if (req.user && req.session.role === 'student') {
    // User is logged in as student, proceed to the next middleware or route handler
    next();
  } else {
    // User is not logged in as student, redirect to /index
    res.redirect('/index');
  }
}
// exports the middleware functions
module.exports = {
  isAdmin,
  isStudent,
};