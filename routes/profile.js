var ejs = require("ejs");
var mysqlQuery = require("./dbConnectivity/mysqlQuery");
var sqlstmt;
var space=" ";

exports.createProfile = function(req, res) {
	console.log("create profile");
	res.render('createProfile', {username : req.session.userName});
};


exports.profile = function(req, res) {
	console.log("showing profile");
	res.render('profile', {
		email : req.session.email
	});
};

exports.toProfile = function(req, res) {

	console.log(req.session.email);
	console.log("---in profile---");

	var uid = req.session.email;
	var country = req.param("country");
	var zipCode = req.param("zipCode");
	var status = req.param("Estatus");
	var jobTitle, company, industry, startYear, endYear, school;
	if(status=="Employed" || status=="JobSeeker")
	{
		if (status == "Employed") {
		jobTitle = req.param("jobTitle");
		company = req.param("company");
		industry = req.param("industry");
		sqlstmt= "update jobs set jobTitle= '"+jobTitle+"', company='"+company+"', industry='"+industry+"'," +
		"startYear= '"+space+"', endYear='"+ space+"' where uid='"+ uid+"'";

	}

	if (status == "JobSeeker") {
		jobTitle = req.param("jobTitle");
		company = req.param("company");
		startYear = req.param("startYear");
		endYear = req.param("endYear");
		sqlstmt= "update jobs set jobTitle= '"+jobTitle+"', company='"+company+"', industry='"+space+"'," +
		"startYear= '"+startYear+"', endYear='"+ endYear+"' where uid='"+ uid+"'";
	}

	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log("Success in insertion");
			res.redirect('/onProfile');
		}
	});
	}

	else if (status == "Student") {
		school = req.param("school");
		startYear = req.param("startYear");
		endYear = req.param("endYear");
		var degree=req.param("degree");
		var field =req.param("field");
		var grade =  req.param("grade");
		var description= req.param("description");
		sqlstmt= "update education set school= '"+school+"', degree='"+ degree+"', field='"+ field+"'," +
		" grade= '"+grade+"', startYear= '"+startYear+"', endYear='"+ endYear+"', description='"+description+"' where uid='"+ uid+"'";
		
		console.log("console sql : "+ sqlstmt);
		mysqlQuery.execQuery(sqlstmt, function(err, result) {
			if (err) {
				console.log("ERROR: " + err.message);
			} else {
				console.log("Success in insertion1");	
				res.redirect('/onProfile');
			}
		});

	}
};


exports.onProfile= function(req,res)
{
	
	console.log("---on profile after login---");
	var uid = req.session.email;
	var name="";
	var job="";
	var education="";
	var summary="";
	var skills="";
	
	var sql0 = "select * from user where email='"+uid+"'";	
	mysqlQuery.execQuery(sql0,function(err, rows, fields){
		if (err) {
			console.log("Error in db");
			throw err;	
	        }else
	        {
	        	if(rows.length > 0)
	        		{
	        		console.log("Success in user");	        		
	        		var result = JSON.parse(JSON.stringify(rows));
	        		console.log("result1 :"+ result[0].firstname );
	        		
	        		name= result[0].firstname + " "+result[0].lastname;
	        		}
	        }
		
	});
	
	var sql1 = "select * from jobs where uid='"+uid+"'";	
	mysqlQuery.execQuery(sql1,function(err, rows, fields){
		if (err) {
			console.log("Error in db");
			throw err;	
	        }else
	        {
	        	if(rows.length > 0)
	        		{
	        		console.log("Success in jobs");	        		
	        		var result = JSON.parse(JSON.stringify(rows));
	        		console.log("job :"+ result[0].uid );
	        		
	        		job= result;
	        		}
	        }
		
	});
	
	var sql2 = "select * from education where uid='"+uid+"'";	
	mysqlQuery.execQuery(sql2,function(err, rows, fields){
		if (err) {
			console.log("Error in db");
			throw err;	
	        }else
	        {
	        	if(rows.length > 0)
	        		{
	        		console.log("Success in jobs");	        		
	        		var result = JSON.parse(JSON.stringify(rows));
	        		
	        		
	        		education=result;
	        		console.log("education :"+ education );
	        		}
	        }
		
	});
	
	var sql3 = "select * from misc where uid='"+uid+"'";	
	mysqlQuery.execQuery(sql3,function(err, rows, fields){
		if (err) {
			console.log("Error in db");
			throw err;	
	        }else
	        {
	        	if(rows.length > 0)
	        		{
	        		console.log("Success in jobs");	        		
	        		var result = JSON.parse(JSON.stringify(rows));
	        		
	        		summary= result[0].summary;
	        		
	        		
	        		skills= result[0].skills;
	        		console.log("skill :"+ skills);
	        		res.render("profile",{name:name, job:job, education:education, summary:summary, skills: skills, lastLogin:req.session.lastLogin});
	        		}
	        }
		
	});
	
	
};




