var db = require("../models");
l = console.log; //simpler logging
// l(db);
l("that was the db");
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.idea.findAll({}).then(function(dbExamples) {
      if (dbExamples.length == 0 || dbExamples == null) {
        dbExamples = {
          id: 1,
          title: "foo",
          descrition: "bar",
          rating: 1
        };
      };
      l("dbEx coming");
      l(dbExamples);
      res.render("index", {
        msg: "Welcome boot camp students!",
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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
