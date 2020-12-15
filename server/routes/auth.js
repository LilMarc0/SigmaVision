const express = require('express');
const router = express.Router();        

const crypto = require('crypto');
const jwt = require('jsonwebtoken')

const {User} = require('../models');
const roles = require('../middlewares/checkRole');

router.post('/login', (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    console.log('login attempt for: ', req.body);
    User.findOne({where: {email: email}}).then(user => {
        console.log('found user');
        const hash = crypto.createHash('sha256').update(pass).digest('base64');
        if(hash === user.passwordHash){
            res.json({
                message: 'ok',
                token: user.sesionId,   
                username: user.username,
                role: user.rol
            });
        } else{
            console.log('no user');
            res.send({message: "err"});
        }
    }).catch(()=>{res.send({message: 'bad'})})
});


router.post('/register', roles.allowAdmin, async (req, res) => {
    req.body.passwordHash = crypto.createHash('sha256').update(req.body.password).digest('base64');
    delete req.body.password;

    req.body.sesionId = '';
    console.log('creating user: ', req.body);
    let user = await User.create(req.body);

    // associate sesion id to user
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.rol
    }
    const sesionId = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: 'RS256'});
    user.sesionId = sesionId;

    await user.save();
    res.send({message: "User Created"});
});



module.exports = router