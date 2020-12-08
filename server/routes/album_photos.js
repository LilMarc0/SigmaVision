const express = require('express');
const crypto = require('crypto');     
const router = express.Router();   
let fs = require('fs');

const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../static/'); 
    },    
    filename: (req, file, cb) => {
        let hashedName = crypto.createHash('sha256').update(file.originalname).digest('base64').toLowerCase();
        hashedName = hashedName.substring(0, 5);    // avoid long path
        cb(null, hashedName);
    }
})
var upload = multer({storage: storage});

const {Photo, Album} = require('../models');
const roles = require('../middlewares/checkRole');

router.post('/:idAlbum', roles.allowAdminMod, upload.fields([{'name':'img'}]), async (req, res) => {
    console.log('recived image: ', req.files.img[0]);
    let model = {
        thumbNail: req.files.img[0].path.split('/')[2],
        extensie: req.files.img[0].mimetype,
        nume:  req.files.img[0].originalname,
    }
    console.log('model: ', model);
    const photo = await Photo.create(model);
    photo.addAlbums(req.params.idAlbum);
    res.json(photo);
})

module.exports = router