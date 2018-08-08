var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Get all examples
  app.get("/api/ideas", function(req, res) {
    db.Idea.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/ideas", function(req, res) {
    db.Idea.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/ideas/:id", function(req, res) {
    db.Idea.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  app.get(
    "/api/users/me",
    passport.authenticate("basic", { session: false }),
    function(req, res) {
      res.json({ id: req.user.id, username: req.user.username });
    }
  );
};
