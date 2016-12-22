var passport = require('passport');
var db = require('../config/database');

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {;
      return res.json(400, {message: "Bad User"});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({name:user.employeename,role:user.role});
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.session.destroy();
  req.logout();
  res.send(200);
}

exports.register = function(req, res) {
 console.log("Bodyyyy"+req.toJson);
   var employee = new db.employeeModel();
  employee.employeename = req.body.employeename;
  employee.password = req.body.password;
    employee.role=req.body.role;
    console.log("print user details"+employee.employeename+"dcoij"+employee.role);

  employee.save(function(err) {
    if(!err){
        if(employee.role=="Manager")
            {
                console.log("checking employee is a manager");
                var manager=new db.managerModel();
                manager.employee_id=employee._id;
                manager.save(function(err)
                            {
                    if(err){
                      console.log("MY Error" +err);
                        return res.sendStatus(400);
                  }
                    // return res.sendStatus(200);
                    console.log(manager._id);
                });
            }
        else if(employee.role=="TechLead")
            {
                var techLead=new db.techLeadModel();
                techLead.employee_id=employee._id;
                techLead.save(function(err)
                            {
                    if(err){
                      console.log("MY Error" +err);
                        return res.sendStatus(400);
                  }
                    // return res.sendStatus(200);
                });
            }
        else
            {
                var developer=new db.developerModel();
                developer.employee_id=employee._id;
                developer.save(function(err)
                            {
                    if(err){
                      console.log("MY Error" +err);
                        return res.sendStatus(400);
                  }
                    // return res.sendStatus(200);
                });
            }
         return res.sendStatus(200);
      }
      console.log("checking.................");
return res.sendStatus(400);
  });
}



