var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , db = require('./database');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.employeeModel.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  db.employeeModel.findOne({ employeename: username }, function(err, employee) {
    if (err) { return done(err); }
    if (!employee) { return done(null, false, { message: 'Unknown user ' + username }); }
    employee.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, employee);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

//Middleware to check if user is authenticated
exports.employeeIsAuthenticated = function userIsAuthenticated(req, res, next) {
  if (req.user) { return next(); }
  res.send(401);
};

//TODO Create autorization (middleware ?).
exports.employeeIsAutorized = function userIsAutorized(objectUserId) {
  return (req.user._id == objectUserId);
}