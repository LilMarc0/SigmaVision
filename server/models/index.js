const dbConfig = require("../DB/db.config.js");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const User = require("./user.js")(sequelize, Sequelize);
const Album = require("./album.js")(sequelize, Sequelize);
const Photo = require("./photo.js")(sequelize, Sequelize);
const Message = require("./message.js")(sequelize, Sequelize);

Album.belongsToMany(Photo, { through: 'album_photo', onDelete: 'cascade', hooks: true});
Photo.belongsToMany(Album, { through: 'album_photo', hooks: true});

User.belongsToMany(Album, { through: 'user_album', hooks: true});
Album.belongsToMany(User, { through: 'user_album', hooks: true});


sequelize.sync().then(()=>{
  console.log("DB SYNCED");
})

module.exports = {
  User,
  Album,
  Photo,
  Message
};
