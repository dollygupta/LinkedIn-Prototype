var ejs = require("ejs");
var mysqlQuery = require("./dbConnectivity/mysqlQuery");
var sqlstmt;
var uid;
	
exports.editSummary = function(req,res)
{
	var summary =  req.param("summary");
	uid = req.session.email;
	sqlstmt= "update misc set summary='"+summary+"' where uid ='"+ uid+"'";
	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log("Success in summary");
			res.redirect('/onProfile');	
		}
	});
};

exports.editEducation = function(req,res)
{
	uid = req.session.email;
	var school = req.param("school");
	var degree = req.param("degree");
	var field = req.param("field");
	var grade = req.param("grade");
	var startYear = req.param("startYear");
	var endYear = req.param("endYear");
	sqlstmt= "update education set school= '"+school+"', degree='"+ degree+"', field='"+ field+"'," +
			" grade= '"+grade+"', startYear= '"+startYear+"', endYear='"+ endYear+"' where uid='"+ uid+"'";
	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log("Success in education");
			res.redirect('/onProfile');	
		}
	});
};

exports.editExperience = function(req,res)
{
	uid = req.session.email;
	var jobTitle = req.param("jobTitle");
	var company = req.param("company");
	var industry = req.param("industry");
	var startYear = req.param("startYear");
	var endYear = req.param("endYear");
	sqlstmt= "update jobs set jobTitle= '"+jobTitle+"', company='"+company+"', industry='"+industry+"'," +
	"startYear= '"+startYear+"', endYear='"+ endYear+"' where uid='"+ uid+"'";
	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log("Success in experience");
			res.redirect('/onProfile');	
		}
	});
};

exports.editSkills = function(req,res)
{
	uid = req.session.email;
	var skills = req.param("skills");
	console.log("skills"+skills);
	sqlstmt= "update misc set skills='"+skills+"' where uid ='"+ uid+"'";
	mysqlQuery.execQuery(sqlstmt, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else {
			console.log("Success in skills");
			res.redirect('/onProfile');	
		}
	});
};