const express = require('express');
const router = express.Router();        

const multer = require("multer");
let fs      = require('fs')
var upload = multer({ dest: '../static/' })


const {Album, Photo, User} = require('../models')

router.get('/', (req, res)=>{
    Album.findAll({include: User}).then(albume => res.send(albume));
})

router.get('/:id', (req, res) => {
    Album.findByPk(req.params.id, {include: [{model: Photo}]}).then(album => res.send(album))
});

router.post('/', upload.fields([{'name': 'img'}]), async (req, res) => {
  let model = JSON.parse(req.body.model);
  model.coperta =  req.files.img[0].filename;
  delete model.fotografie;

  let album = await Album.create(model);
  let user = await User.findByPk(req.user.id);
  await user.addAlbum(album.id);

  const ret = await Album.findByPk(album.id, {include: [{model: User}]});
  console.log(ret);
  res.send(ret);

})

router.put('/:id', async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    if (!album) {
      return res.status(404).send('Category with submitted ID not found');
    }
    try {
      const updatedAlbum = await album.update({ name: req.body.name });
      res.send(updatedAlbum);
    } catch(err) {
      res.status(400).send(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    if (!album) {
      return res.status(404).send('Category with submitted ID not found');
    }
    await album.destroy();
    res.send(album);
  });

  router.get('/hall/hall', async (req, res) => {
    const album = await Album.findOne({where: {nume: "Hall of Fame"}, include: [{model: Photo}]})
    res.send(album.photos)
  });
module.exports = router