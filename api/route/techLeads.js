var db = require('../config/database.js');

var async=require('async');
exports.list = function(req, res) {
    var editedTechLeads=[];
    async.waterfall([
        function(callback)
        {
           db.techLeadModel.find({manager_id:null}, function(err, results) {
		if (err) {
			console.log(err);
			return res.send(400);
		}
               else if(results.length==0)
                   {
                       return res.send("techleads not available");
                   }
               else{
                    callback(null,results);
               }
              
           });
            
        },
        function(results,callback)
        {
            var checker=results.length;
            results.forEach(function(tech)
                       {
            db.techLeadModel.findOne({_id:tech._id})
  .populate('employee_id','employeename')
  .exec (function(err, techLeads)
            {
                if(!err)
                    {
                        console.log(techLeads.employee_id.employeename);
                       --checker; 
                editedTechLeads.push(techLeads);
                                            }
                if(checker==0)
                {
                     callback();
                }
           

            })
        });
            
        }
        
    ],function(error)
                   {
        if(!error)
            {
                console.log("developers length...........",editedTechLeads.length);
                return res.json(editedTechLeads);
            }
        else{
            console.log("techleads error");
        }
    });
}
/*exports.list = function(req, res) {
    var editedDevelopers=[];
	db.developerModel.find({manager_id:null}, function(err, results) {
		if (err) {
			console.log(err);
			return res.send(400);
		}
        results.forEach(function(dev)
                       {
            db.developerModel.findOne({_id:dev._id})
  .populate('employee_id','employeename')
  .exec (function(err, developer)
            {
                if(!err)
                    {
                        console.log(developer.employee_id.employeename);
                        
                editedDevelopers.push(developer);
                                            }

            })
        });

		return res.json(editedDevelopers);
	});
};*/
//need only one account..................................................


/*
exports.create = function(req, res) {
	if (req.body.name === undefined || req.body.currency === undefined) {
		return res.json(400, {message:"Bad Data"});
	}

	var account 		= new db.accountModel();
	account.name 		= req.body.name;
	account.currency 	= req.body.currency;
	account.balance 	= 0;
	account.user_id		= req.user._id

	account.save(function(err) {
		if (err) {
			console.log(err);
			return res.send(400);
		}
		return res.json(200, account);
	});
};

exports.delete = function(req, res) {
	if (req.params.id === undefined) {
		return res.json(400, {message:"Bad Data"});
	}

	var accountId = req.params.id;

	db.accountModel.findOne({user_id: req.user._id, _id: accountId}, function(err, result) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		db.recordModel.find({account_id: result._id}, function(err, records) {
			if (err) {
				console.log(err);
				return res.send(400);
			}
			records.forEach(function(record) {
				record.remove();
			})

			result.remove();
			return res.send(200);
		});
	});
};

exports.detail = function(req, res) {
	if (req.params.id === undefined) {
		return res.json(400, {message:"Bad Data"});
	}
	
	var accountId = req.params.id;

	db.accountModel.findOne({user_id: req.user._id, _id: accountId}).lean().exec(function(err, result) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		if (result === null) {
			return res.json(400);
		}

		db.recordModel.find({account_id: accountId, user_id: req.user._id}, function(err, records) {
			if (err) {
				console.log(err);
				return res.send(400);
			}

			result.records = records;

			return res.json(result);
		});

	});
};

*/
