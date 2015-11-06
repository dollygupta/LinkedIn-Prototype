
/**
 * Module dependencies.
 */

var express = require('express')
	
  , routes = require('./routes')
  , signUp = require('./routes/signUp')
  , login = require('./routes/login')
  , profile = require('./routes/profile')
  , edit = require('./routes/edit')
  ,connect = require('./routes/connect')
  , http = require('http')
  , path = require('path');


var app = express();



app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/', routes.index);
app.get('/signup', signUp.signup);
app.post('/signUp',signUp.onsignUp);

app.get('/login', login.login);
app.post('/onLogin', login.onLogin);
app.get('/logout', login.logout);

app.post('/toProfile',profile.toProfile);
app.get('/profile', profile.profile);
app.get('/createProfile', profile.createProfile);
app.get('/onProfile', profile.onProfile);

app.post('/editSummary' , edit.editSummary);
app.post('/editEducation', edit.editEducation);
app.post('/editExperience', edit.editExperience);
app.post('/editSkills', edit.editSkills);

app.get('/addConnection',connect.addConnection);
app.post('/sendRequest', connect.sendRequest);
app.get('/friendRequest', connect.friendRequest);
app.get('/answerRequest', connect.answerRequest);
app.get('/friendList', connect.friendList);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
