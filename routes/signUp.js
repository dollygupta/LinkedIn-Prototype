var ejs = require("ejs");
var mysqlQuery = require("./dbConnectivity/mysqlQuery");
var sqlstmt="";
var space="";
var flag=0;
exports.signup= function (request,response)
{
	response.render("signup",{errorMessage:""});
};


exports.onsignUp = function(request, response) {

	console.log("Entered server side");
	
	var first_name = request.param("firstName");
	var last_name = request.param("lastName");
	var email_id = request.param("email");
	var password = request.param("password");
	
	//create session variable
	request.session.userName=first_name;
	request.session.email =  email_id;
	var uid = request.session.email;
	
	sqlstmt = "select * from user where email ='"+uid+"'";
	mysqlQuery.execQuery(sqlstmt,function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
			
		} else {
			console.log("Success find");	
			if(result.length > 0)
			{
				var results = JSON.parse(JSON.stringify(result));
				for(var i=0; i<results.length;i++)
					{
					if(results[i].email==uid)
						{
						console.log("found email:" + result[i].email)
						flag=1;
						 response.render('index', { title: 'LinkedInPrototype' })
						}
					}
			}
				if(flag==0)
					{
					
					
		
    // sql query
	sqlstmt = "insert into user (firstname,lastname, email,password, lastLogin) values ('"+first_name+"','"+last_name+"','"+email_id+"','"+password+"',NOW())";
	//var params = [ first_name, last_name, email_id, password, "NOW()"];
	mysqlQuery.execQuery(sqlstmt,function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
			
		} else {
			console.log("Success in insertion");		
		}
	});
	
	
	sqlstmt = "insert into jobs (uid, jobTitle, company, industry,startYear,endYear)" +
	" values('"+uid+ "','"+ space + "','"+ space+ "','"+ space+ "','"+space+ "','"+space+"')";
	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log("Success in insertion11");
		}
	});
	
	sqlstmt = "insert into education (uid, school, startYear, endYear,degree, field, grade, description) values " +
	"('"+ uid+ "','"+ space+ "','"+ space+ "','"+ space+"','"+ space+ "','"+ space+ "','"+ space+"','"+ space+ "')";
	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);

		} else {
			console.log("Success in insertion01");
		}
	});
	
	sqlstmt= "insert into misc (uid, skills, summary) values('"+uid+ "','"+ space + "','"+ space+ "')";
	console.log("sql misc :" +sqlstmt);
	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log("Success in insertion misc");
			response.redirect('/createProfile');
		}
	});
	
	/*sqlstmt= "insert into invite (uid, requestId) values('"+uid+ "','"+ space + "')";
	console.log("sql misc :" +sqlstmt);
	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log("Success in insertion invite");
			
		}
		
	});
	
	/*sqlstmt= "insert into friendList (uid, friendId) values('"+uid+ "','"+ space+ "')";
	console.log("sql misc :" +sqlstmt);
	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log("Success in insertion misc");
		}
	});*/
					}
			
			
			
		}
	});
		

};
