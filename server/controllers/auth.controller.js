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

// exports the middleware functions
module.exports = {
  isAdmin,
};