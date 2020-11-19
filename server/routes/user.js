const express = require('express');
const router = express.Router();        


const {User1} = require('../models')

router.put('/:id', async (req, res) => {
    User.update(
        req.body.user,
        {where: req.params.id}
      )
      .then(function(rowsUpdated) {
        res.json(rowsUpdated)
      })
});

module.exports = router