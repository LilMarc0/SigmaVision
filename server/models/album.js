const fs = require('fs');

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
      coperta: {
        type: DataTypes.STRING
      }
    },{
      hooks: {
        beforeDestroy(album) {
          console.log('--------', '../static/' + album.coperta);
          try{
            console.log('--------', '../static/' + album.coperta);
            fs.unlink('../static/' + album.coperta, err => {
              if (err) console.log(err);
            });
          } catch(err) {
            console.log(err)

          }
        },
        beforeBulkDestroy(album) {
          console.log('--------', '../static/' + album.coperta);

          try{
            console.log('--------', '../static/' + album.coperta);
            fs.unlink('../static/' + album.coperta, err => {
              if (err) console.log(err);
            });
          } catch(err) {
            console.log(err)

          }

        }
      }
    });
  };
  