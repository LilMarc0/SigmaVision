module.exports = function(sequelize, DataTypes) {
    return sequelize.define('album', {
      nume: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [3, 50]
      },
      descriere: {
          type: DataTypes.STRING
      },
      creator: {
        type: DataTypes.STRING
      },
      coperta: {
        type: DataTypes.STRING
      }
    });
  };
  