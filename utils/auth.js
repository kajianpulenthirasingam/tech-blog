const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the user to the login page
    if (!req.session.logged_in) {
      res.redirect("/login");
    } else {
      // If the user is logged in, execute the route
      next();
    }
  };
  
  module.exports = withAuth;