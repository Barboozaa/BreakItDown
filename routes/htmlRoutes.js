var db = require("../models");
l = console.log; //simpler logging

module.exports = function (app) {
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
  app.get("/example/:id", function (req, res) {
    db.idea.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
