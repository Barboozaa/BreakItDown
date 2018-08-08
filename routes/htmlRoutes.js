var db = require("../models");
l = console.log; //simpler logging
var passport = require("passport");
var path = require("path")
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var isAuthenticated = require("../config/isAuthenticated");


module.exports = function(app) {
  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
  app.get("/memberss", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
  // Load index page
  app.get("/", function(req, res) {
    db.idea.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Rise and shine, boot campers",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.idea.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Load submit page
  app.get("/submit", function(req, res) {
    res.render("submitIdeas");
  });

 app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));

  // res.render("login");
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

//  app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true,
//   successFlash: 'Welcome!' }),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });

  


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
