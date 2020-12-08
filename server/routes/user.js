const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const roles = require('../middlewares/checkRole');
const {User} = require('../models')

router.put('/:id', roles.allowAdmin, async (req, res) => {
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
  
  const sesionid = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: 'RS256'});
  user.dataValues.sesion = sesionid;
  res.send(user);
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    if(user.role != 'admin'){
      await user.destroy();
      res.send(user);
    }
  }
});


module.exports = router