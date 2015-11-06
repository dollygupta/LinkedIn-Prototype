var ejs = require("ejs");
var mysqlQuery = require("./dbConnectivity/mysqlQuery");

exports.login = function(req, res){
	console.log("----LOGIN----");
  res.render('login', {});
};

exports.onLogin = function(req, res){
	
	console.log("in onlogin");
	var user = req.param("email");
	var password = req.param("password");
	console.log("email" + user);
	// setting session variable
	req.session.email = user;
	//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	
	// sql
	var sqlstmt = "select * from user where email ='"+user+"' AND password='"+password+"'";  
	
	mysqlQuery.execQuery(sqlstmt,function(err, rows, fields){
		if (err) {
		// throw err;
			console.log("Error in db");
        }else
        {
        	if(rows.length > 0)
        		{
        		console.log("Success in checking");
        		
        		var result = JSON.parse(JSON.stringify(rows));
        	// console.log(result[0].lastLogin);
        		req.session.lastLogin = result[0].lastLogin;
        		
        		sqlstmt= "update user SET lastLogin=NOW() where email='" + user + "'";
        		mysqlQuery.execQuery(sqlstmt,function(err, rows, fields){
        			if(err){
						throw err;
					} else {
						console.log('Last login Updated');
						}
        		});
        		
            	res.redirect('/onProfile');
        		}
        	else{
        		res.render('index');
        	}
        		
        }	
	});
};
	        	
exports.logout = function(req, res)
{
	console.log("logout");
	
	delete req.session;
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.redirect('/');
	};

	

