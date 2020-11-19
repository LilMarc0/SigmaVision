
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('message', {
      nume: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING
      },
      mesaj: {
          type: DataTypes.STRING
      },
      telefon: {
          type: DataTypes.STRING
      }
    }
    );
  };