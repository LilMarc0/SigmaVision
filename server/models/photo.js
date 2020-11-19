const fs = require('fs');

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
    },{
      hooks: {
        beforeDestroy(photo) {
          console.log('--------', '../static/' + photo.thumbNail);
          try{
            console.log('--------', '../static/' + photo.thumbNail);
            fs.unlink('../static/' + photo.thumbNail, err => {
              if (err) console.log(err);
            });
          } catch(err) {
            console.log(err)

          }
        },
        beforeBulkDestroy(photo) {
          console.log('--------', '../static/' + photo.thumbNail);

          try{
            console.log('--------', '../static/' + photo.thumbNail);
            fs.unlink('../static/' + photo.thumbNail, err => {
              if (err) console.log(err);
            });
          } catch(err) {
            console.log(err)

          }

        }
      }
    });
  };
  