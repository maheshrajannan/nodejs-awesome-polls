var express = require('express');
var passport = require('passport');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var request = require('request');

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

var renderLoginFunction =   function(req, res){
    console.log("Defined function as a variable..AIYAA");
    res.render('login', { env: env });
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
      console.log("user:"+JSON.stringify(req.user));
      console.log("user emails:"+JSON.stringify(req.user.emails[0]));
      console.log("user emails:"+req.user.emails[0]);
      res.render('polls', {user: req.user, polls: polls});
    } else {
      res.render('error');
    }
  })
})

router.get('/user', ensureLoggedIn, function(req, res, next) {
  req.user.email='mahesh.rajannan@gmail.com';
  res.render('user', { user: req.user });
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/polls');
  });

module.exports = router;