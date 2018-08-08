var db = require("../models");
l = console.log; //simpler logging
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Idea.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Rise and shine, boot campers",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/ideas/:id", function(req, res) {
    db.Idea.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
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
    // res.render("login");
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
  });

  app.get("/signup", function(req, res) {
    // res.render("signup");
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
  });

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res) {
      res.redirect("/");
    }
  );

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome!"
    }),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.redirect("/users/" + req.user.username);
    }
  );

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
