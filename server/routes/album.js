const express = require('express');
const router = express.Router();        

const multer = require("multer");
let fs      = require('fs')
var upload = multer({ dest: '../static/' })


const {Album, Photo} = require('../models')

router.get('/', (req, res)=>{
    Album.findAll().then(albume => res.send(albume));
})

router.get('/:id', (req, res) => {
    Album.findByPk(req.params.id, {include: [{model: Photo}]}).then(album => res.send(album))
});

router.post('/', upload.fields([{'name': 'img'}]), (req, res) => {
  let model = JSON.parse(req.body.model);
  console.log(req.files)
  model.coperta =  req.files.img[0].filename;
  model.creator = req.user.username;
  delete model.fotografie;
  console.log(model);
  Album.create(model).then((album)=>{
    if(album) res.send(album);
    else res.send({message: 'bad'});
  })
})

router.put('/:id', async (req, res) => {
    const album = await Album.findById(req.params.id);
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
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).send('Category with submitted ID not found');
    }
    await album.destroy();
    res.send(album);
  });

module.exports = router