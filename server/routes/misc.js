const express = require('express');
const router = express.Router();        
const fs = require('fs');

const {Misc} = require('../models');

router.put('/', async (req, res) => {
    console.log(JSON.stringify(req.body));
    fs.writeFile('misc.json', JSON.stringify(req.body), (err)=>{if (err) throw err})
});

router.get('/', (req, res) => {
    fs.readFile('misc.json', (err, data)=>{
        let misc = JSON.parse(data);
        res.send(misc);
    })
});

module.exports = router