module.exports = function(sequelize, DataTypes) {
  var Idea = sequelize.define("idea", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  Idea.associate = function(models) {
    models.idea.hasMany(models.userstory, {
      onDelete: "cascade"
    });
  };

  return Idea;
};
