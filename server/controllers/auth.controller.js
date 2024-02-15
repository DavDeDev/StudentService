// Middleware to check if the user is logged in as an admin
function isAdmin(req, res, next) {
  // Check if the user is logged in as an admin
  if (req.user && req.user.role === 'admin') {
    // User is logged in as an admin, proceed to the next middleware/controller
    next();
  } else {
    // User is not logged in as an admin, redirect to the index page
    res.redirect('/index');
  }
}

// Middleware to check if the user is logged in as a student
function isStudent(req, res, next) {
  // Check if the user is logged in as a student
  if (req.user && req.user.role === 'student') {
    // User is logged in as a student, proceed to the next middleware/controller
    next();
  } else {
    // User is not logged in as a student, redirect to the index page
    res.redirect('/index');
  }
}

module.exports = {
  isAdmin,
  isStudent
};
// Middleware function to check if the user is logged in as admin or student
const checkUserRole = (req, res, next) => {
  // Check if user is logged in
  if (!req.session.user) {
    // User is not logged in, redirect to index page
    return res.redirect('/index');
  }

  // Check if user is admin
  if (req.session.user.role === 'admin') {
    // User is logged in as admin, continue to next controller
    return next();
  }

  // Check if user is student
  if (req.session.user.role === 'student') {
    // User is logged in as student, continue to next controller
    return next();
  }

  // User role is neither admin nor student, redirect to index page
  return res.redirect('/index');
};

module.exports = checkUserRole;
// Middleware to check if user is logged in as admin or student
function checkLoggedIn(req, res, next) {
  // Check if user is logged in as admin or student
  if (req.session && (req.session.isAdmin || req.session.isStudent)) {
    // User is logged in, proceed to next controller
    next();
  } else {
    // User is not logged in, redirect to index page
    res.redirect('/index');
  }
}

module.exports = {
  checkLoggedIn
};
