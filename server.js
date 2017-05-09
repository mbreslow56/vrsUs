var express = require('express');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/userModel');
var userRoutes = require('./routes/userRoutes');
var btlRoutes = require('./routes/btlRoutes');

mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/voutr');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport.use(new FacebookStrategy({
//     clientID: '671277003082097',
//     clientSecret: '3587b03e9bd14c9b0b4ca0f373904dd3',
//     callbackURL: 'http://localhost:8008/auth/facebook/callback',
//     profileFields: ['email', 'displayName']
//   },
//   function(accessToken, refreshToken, profile, done) {

//     //code to check database goes here

//     //code to create JWT goes here
//     return done(null, profile)
//   }
// ));

//Configure passport and session middleware
app.use(expressSession({
  secret: 'thisIsASecret',
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.static('node_modules'));

// Configure passport-local to use user model for authentication
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//This tells the server that when a request comes into '/beers'
//that it should use the routes in 'beerRoutes'
//and those are in our new beerRoutes.js file
app.use('/users', userRoutes);
app.use('/btls', btlRoutes);



app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(process.env.PORT || '8008', function(){
  console.log("8008. vrsUs bitch!")
});
