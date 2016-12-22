var express = require('express')
	, app = express()
	, db = require('./config/database')
	, pass = require('./config/pass')
	, passport = require('passport');
var path= require('path');

//Route
var routes = {};
routes.projects = require('./route/projects.js');
routes.managers = require('./route/managers.js');
routes.techLeads = require('./route/techLeads.js');
routes.developers = require('./route/developers.js');
routes.users = require('./route/users.js');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var logger = require('morgan');
app.use(logger('dev'));
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

var methodOverride = require('method-override');


app.use(methodOverride('X-HTTP-Method-Override'));
var session = require('express-session');
var sess = {
  secret: 'af5d8ltLowdfDic24aQsPrfl1ds78dkjf5szSDdzge5',
  cookie: {}
}
 
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy 
  sess.cookie.secure = true // serve secure cookies 
}
 
app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../')));


app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});
app.post('/login', routes.users.login);

app.post('/register', routes.users.register);

app.get('/logout', pass.employeeIsAuthenticated, routes.users.logout);

app.get('/developers', pass.employeeIsAuthenticated, routes.developers.list);

app.post('/createProject', pass.employeeIsAuthenticated, routes.projects.create);

app.get('/techLeads', pass.employeeIsAuthenticated, routes.techLeads.list);

console.log('Employee mangement Node.js server starts..');

app.listen(4000);

/*
//Get all accounts and compute balance.
app.get('/accounts', pass.userIsAuthenticated, routes.accounts.list);
*/

/*//Create new Account
app.post('/accounts', pass.userIsAuthenticated, routes.accounts.create);*/

/*//Delete Account
app.delete('/accounts/:id', pass.userIsAuthenticated, routes.accounts.delete);

//Get specific account
app.get('/accounts/:id', pass.userIsAuthenticated, routes.accounts.detail);*/



//Create new Record


//Delete Record
//app.delete('/records/:recordId', pass.employeeIsAuthenticated, routes.records.delete);

//Get all categories


//Create new category
//app.post('/techLeads', pass.employeeIsAuthenticated, routes.techLeads.create);

//Delete Category
//app.delete('/techLeads/:techLeadId', pass.employeeIsAuthenticated, routes.categories.delete);

