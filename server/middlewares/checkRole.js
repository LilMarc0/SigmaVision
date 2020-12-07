const jwt = require('jsonwebtoken');
const { User } = require('../models');

function allowAdmin(req, res, next) {
    if(req.user.role == 'admin'){
        next()
    } else{
        const error = new Error('🚫 Un-Authorized 🚫');
        res.status(401);
        next(error);
    }
}

function allowMod(req, res, next) {
    if(req.user.role == 'moderator'){
        next()
    } else{
        const error = new Error('🚫 Un-Authorized 🚫');
        res.status(401);
        next(error);
    }
}

function allowAdminMod(req, res, next) {
    if(req.user.role == 'admin' || req.user.role == 'moderator'){
        next()
    } else{
        const error = new Error('🚫 Un-Authorized 🚫');
        res.status(401);
        next(error);
    }
}


module.exports = {
  allowAdminMod,
  allowAdmin,
  allowMod
};