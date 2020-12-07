const express = require('express');
const router = express.Router();  
const jwt = require('jsonwebtoken');


const {User1, User} = require('../models')

router.put('/:id', async (req, res) => {
    User.update(
        req.body.user,
        {where: req.params.id}
      )
      .then(function(rowsUpdated) {
        res.json(rowsUpdated)
      })
});

router.get('/:username', async (req, res) => {
  let user = await User.findOne({where: {username: req.params.username}});
  user.passwordHash='';

  
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.rol
  }
  
  const sesionid = jwt.sign(payload, process.env.TOKEN_SECRET);
  
  user.dataValues.sesion = sesionid;

  res.send(user);
});


module.exports = router