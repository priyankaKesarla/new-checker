var db = require('../config/database.js');
var async=require('async');

/*exports.list = function(req, res) {
  	db.categoryModel.find({user_id: req.user._id}, function(err, results) {
  		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		return res.json(results);
  	});
}*/
//-----------------main focus for now----------------------------------



exports.create = function(req, res) {
	if (req.body=== null) {
		return res.json(400);
	}
var struc=req.body;
    console.log(struc);
    var length=struc.length;
    var i=0;
async.forEachSeries(struc,function(st,callback)
     {
    i++;
    console.log("entered foreach series.........................");
		 async.series([function(callback)
			 {
                 console.log("async series functionality started................");
				 db.techLeadModel.update({_id:st.tech._id},{$set:{manager_id:req.user._id}},function(err,num)
    {
        console.log(num);
    })
	callback();
			 },
			 function(callback)
			 {
				 db.managerModel.update({_id:req.user._id},{$push:{techLead_id:st.tech._id}},function(err,num)
    {
        console.log(num);
    })
	callback();
			 }],function(error)
			 {
				console.log("done with tech leads array................"); 
			 })
         if(i==length)
             {
                 return res.send(200);
             }
    else{
         callback();
    }
			
	 })
}
	 
	 /*async.forEachSeries(strc,function(st,callback)
     {
				 async.forEachSeries(st.dev,function(de)
                      {
						  async.series([
						  function(callback)
			 {
                     db.techLeadModel.update({_id:st._id},{$push:{developer_id:de._id}},function(err,num)
    {
        console.log(num);
    })
	callback();
	
			 },
			 
			 function(callback)
			 {
				db.developerModel.update({_id:de._id},{$set:{manager_id:req.user._id},$set:{techLead_id:st._id}},function(err,num)
    {
        console.log(num);
    })
	callback(); 
			 },
			 function(callback)
			 {
				db.ManagerModel.update({_id:req.user._id},{$push:{developer_id:de._id}},function(err,num)
    {
        console.log(num);
    })
	callback(); 
			 }],
			 function(error)
			 {
				 if(!err)
				 {
					 console.log("done with developers.......................................")
				 }
			 })
			 callback();
					  })
					  callback();
     })
     return res(200);
}
	 */
			


//----------------main focus for now-----------------------------------------
/*exports.delete = function(req, res) {
	if (req.params.categoryId === undefined) {
		return res.json(400);
	}

	var categoryId = req.params.categoryId;

	db.categoryModel.findOne({user_id: req.user._id, _id: categoryId}, function(err, result) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		result.remove();
		return res.send(200);
	});
}*/