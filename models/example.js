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
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  });
  return Idea;
};

