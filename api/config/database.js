var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;

var uristring = 'mongodb://localhost/budget';

var mongoOptions = { };

mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) { 
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Successfully connected to: ' + uristring);
  }
});

var Schema = mongoose.Schema;

// Employee schema
var Employee = new Schema({
  employeename: { type: String, required: true, unique: true },
  password: { type: String, required: true},
    role:{type:String, required:true}
});

var Project=new Schema({
    projectName:{ type: String, required: true, unique: true },
});

var Tasks=new Schema({
    taskName:{ type: String, required: true, unique: true },
    taskStatus:{ type: String, required: true, unique: true }
    
});
var Manager = new Schema({
  employee_id: { type: Schema.ObjectId, ref: 'Employee', required: true },
    techLead_id: { type: Schema.ObjectId, ref: 'TechLead'},
    developer_id: { type: Schema.ObjectId, ref: 'Developer'},
    project_id: { type: Schema.ObjectId, ref: 'Project'}
});

var TechLead = new Schema({
  employee_id: { type: Schema.ObjectId, ref: 'Employee', required: true },
    developer_id: { type: Schema.ObjectId, ref: 'Developer'},
    task_id_id: { type: Schema.ObjectId, ref: 'Tasks'}
});

var Developer = new Schema({
  employee_id: { type: Schema.ObjectId, ref: 'Employee', required: true },
    task_id_id: { type: Schema.ObjectId, ref: 'Tasks'}
});


// Bcrypt middleware on EmployeeSchema
Employee.pre('save', function(next) {
  var employee = this;

  if(!employee.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(employee.password, salt, function(err, hash) {
      if(err) return next(err);
      employee.password = hash;
      next();
    });
  });
});

//Password verification
Employee.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};

var employeeModel = mongoose.model('Employee', Employee);
var projectModel = mongoose.model('Project', Project);
var tasksModel = mongoose.model('Tasks', Tasks);
var managerModel = mongoose.model('Manager', Manager);
var techLeadModel = mongoose.model('TechLead', TechLead);
var developerModel = mongoose.model('Developer', Developer);



// Export Models
exports.employeeModel = employeeModel;
exports.projectModel = projectModel;
exports.tasksModel = tasksModel;
exports.managerModel = managerModel;
exports.techLeadModel = techLeadModel;
exports.developerModel = developerModel;
