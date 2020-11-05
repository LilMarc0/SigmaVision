const express = require('express');
const router = express.Router();        


const multer = require("multer");
let fs      = require('fs')
var upload = multer({ dest: '../static/' })

const {Photo, Album} = require('../models');


router.post('/:idAlbum', upload.fields([{'name':'img'}]), async (req, res) => {
    let model = {
        thumbNail: req.files.img[0].path.split('/')[2],
        extensie: req.files.img[0].mimetype,
        nume:  req.files.img[0].originalname,
    }
    console.log(model);
    const photo = await Photo.create(model);
    photo.addAlbums(req.params.idAlbum);  
    res.json(model);
})

module.exports = router