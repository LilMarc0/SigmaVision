module.exports = function(sequelize, DataTypes) {
    return sequelize.define('sigmauser', {
      nume: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [3, 50]
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true,
        allowNull: false
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rol: {
        type: DataTypes.STRING,
        defaultValue: "moderator"
      },
      username: {
        type: DataTypes.STRING
      },
      linkPhoto: {
        type: DataTypes.STRING
      },
      sesionId: {
        type: DataTypes.STRING(512)
      }
    });
};
  