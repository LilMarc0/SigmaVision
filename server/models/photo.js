
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('photo', {
      extensie: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [3, 50]
      },
      nume: {
        type: DataTypes.STRING
      },
      thumbNail: {
          type: DataTypes.STRING
      }
    });
  };
  