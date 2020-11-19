const express = require('express');
const router = express.Router();        

const {Message} = require('../models');

router.post('/', async (req, res) => {
    console.log("merge");
    const message = await Message.create(req.body);
    res.send({message: "ok"});
});

router.get('/', async (req, res) => {
    const msg = await Message.findAll();
    res.send(msg);
});

router.delete('/:id', async (req, res) => {
    const msg = await Message.findByPk(req.params.id);
    await msg.destroy();
    res.send({message: "ok"});
});

module.exports = router