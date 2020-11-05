const express = require('express');
const router = express.Router();        


const {Photo} = require('../models')

router.delete('/:id', async (req, res) => {
    const photo = await Photo.findByPk(req.params.id);
    if (photo) {
      await photo.destroy();
      res.send(photo);
    }
});

module.exports = router