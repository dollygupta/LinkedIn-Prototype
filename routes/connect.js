var ejs = require("ejs");
var mysqlQuery = require("./dbConnectivity/mysqlQuery");
var sqlstmt;

exports.addConnection = function(req, res)
{
	var uid = req.session.email;
	var temp="";
	console.log("--- connecting new friends---");	
	sqlstmt= "select firstname, lastname, email from user where email !='"+ uid+"'";
	mysqlQuery.execQuery(sqlstmt, function(err, rows) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
    		console.log("Success in jobs");	        		
    		var userList = JSON.parse(JSON.stringify(rows));
    		
    		var sql= "select friendId from friendList where uid='"+ uid+"'";
    		mysqlQuery.execQuery(sql, function(err, rows) {
    			if (err) {
    				console.log("ERROR: " + err.message);
    			} else {	
    				
    	    		var friendList = JSON.parse(JSON.stringify(rows));
    	    		for(var i=0; i<userList.length;i++)
    	    			for(var j=0; j<friendList.length; j++)
    	    				{
    	    					if(userList[i].email!=friendList[j].friendId)
    	    						{
    	    						temp+=userList[i]+",";
    	    						}
    	    						
    	    				}
    	    		userList="["+temp+"]";
    	    		
    			}
    		});
    		console.log(userList);
    		res.render("addConnection",{userList:userList});
    		
		}
	});
	
};

exports.sendRequest = function(req,res)
{
	var uid= req.session.email;
	var requestId = req.param("userRequest");
	if(requestId.length<10)
	{
		var len = requestId.length;
	}
	else
		{
		var len=1;
		}
	if(len==1)
		{
		 sqlstmt="insert into invite (uid, requestId) values('"+requestId+ "','"+uid+ "')";
		 mysqlQuery.execQuery(sqlstmt, function(err, result) {
				if (err) {
					console.log("ERROR: " + err.message);
				} else {
					console.log("Success in insertion Invitelist");	
					res.redirect('/onProfile');
				}
		 });
		}
	else
		{
		for(var i=0; i<requestId.length;i++)
		{
		  console.log (requestId[i]);
		 sqlstmt="insert into invite (uid, requestId) values('"+requestId[i]+ "','"+uid+ "')";
		 mysqlQuery.execQuery(sqlstmt, function(err, result) {
				if (err) {
					console.log("ERROR: " + err.message);
				} else {
					console.log("Success in insertion Invitelist");
					res.redirect('/onProfile');
				}
		 });
		}
		} 
};

exports.friendRequest= function(req,res)
{
	var uid= req.session.email;
	
	sqlstmt= "select requestId from invite where uid='"+uid+"'";
	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
					var requestList= JSON.parse(JSON.stringify(result));
			res.render("friendRequest.ejs",{requestList:requestList});
		}
 });
};

exports.answerRequest= function(req,res)
{
	console.log("----------requestId and action:--------- ");
	var uid= req.session.email;
	var action= req.query.action;
	var requestId = req.query.requestId;
	console.log("requestId and action: "+ requestId + action);

		if(action=="accept")
		{
		 sqlstmt="insert into friendList (uid, friendId) values('"+uid+ "','"+requestId+ "')";
		 mysqlQuery.execQuery(sqlstmt, function(err, result) {
				if (err) {
					console.log("ERROR: " + err.message);
				} else {
					console.log("Success in insertion  friendlist");	
					var sql="delete from invite where uid='"+uid+ "'";
					 mysqlQuery.execQuery(sql, function(err, result) {
							if (err) {
								console.log("ERROR: " + err.message);
							} else {
								console.log("Success in deletion invitelist");	
							}
					 });
				}
		 });
		 sqlstmt="insert into friendList (uid, friendId) values('"+requestId+ "','"+uid+ "')";
		 mysqlQuery.execQuery(sqlstmt, function(err, result) {
				if (err) {
					console.log("ERROR: " + err.message);
				} else {
					console.log("Success in insertion  friendlist");
					res.redirect('/friendRequest');
				}
		 });
		}
		 if(action=="ignore")
			 {
			 sqlstmt="delete from invite where requestId='"+requestId+ "'";
			 mysqlQuery.execQuery(sqlstmt, function(err, result) {
					if (err) {
						console.log("ERROR: " + err.message);
					} else {
						console.log("Success in deletion invitelist");	
					}res.redirect('/friendRequest');
			 });
			 }
			
	
	
};

exports.friendList= function(req,res)
{
	var uid= req.session.email;
	var friendList="";
	sqlstmt= "select friendId from friendList where uid='"+uid+"'";
	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			
					 friendList= JSON.parse(JSON.stringify(result));
		
			res.render("friendList",{friendList:friendList});
		}
 });
	
};
	  