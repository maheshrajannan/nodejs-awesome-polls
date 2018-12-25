var express = require('express');
var passport = require('passport');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var request = require('request');
var util = require('util');

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

var renderLoginFunction =   function(req, res){
    console.log("Defined function as a variable..AIYAA");
    res.render('login', { env: env });
  };

var cleanUser =   function(callContext,user){
      console.log(callContext+"user:"+JSON.stringify(user));
      console.log(callContext+"user emails stringify:"+JSON.stringify(user.emails[0]));
      console.log(callContext+"user emails object:"+user.emails[0]);
      console.log(callContext+"user emails value:"+JSON.stringify(user.emails[0].value));
      if(user.nickname) {
        console.log(callContext+"No need to change nickname");
      } else {
        user.nickname=user.emails[0].value;
        console.log(callContext+"Nick name changed to "+user.nickname);
      }
      if(user.emails.value) {
        console.log(callContext+"No need to change emails");
      } else {
        user.emails.value=user.emails[0].value;
        console.log(callContext+"Email changed to "+user.emails.value);
      }        
      return user;  
  };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { env: env });
});

router.get('/login',renderLoginFunction);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/polls', ensureLoggedIn, function(req, res){
  request('http://elections.huffingtonpost.com/pollster/api/charts.json?topic=2016-president', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var polls = JSON.parse(body);
      //console.log("request:"+util.inspect(req));
      req.user=cleanUser("From /polls",req.user);
      res.render('polls', {user: req.user, polls: polls});
    } else {
      res.render('error');
    }
  })
})

router.get('/user', ensureLoggedIn, function(req, res, next) {
  req.user=cleanUser("From /user",req.user);
  res.render('user', { user: req.user });
});

//INFO: passport.authenticate takes its request object and if successful sets the 
// user object
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/error' }),
  function(req, res) {
    //INFO: If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //http://www.passportjs.org/packages/passport-auth0/
    //INFO: refer the configuration being done on app.js
    //auth0 sets it up on the response, passport takes it and set's it up on request ?
    req.user=cleanUser("From callback",req.user);
    res.redirect(req.session.returnTo || '/polls');
  });

module.exports = router;