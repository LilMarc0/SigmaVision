const { kStringMaxLength } = require('buffer');
const express = require('express');
const router = express.Router();        
const fs = require('fs');

const {Misc} = require('../models');

router.get('/:file', (req, res) => {
    fs.readFile(req.params.file, (err, data)=>{
        let misc = data.toString();
        console.log(misc);
        res.send(misc);
    })
});

module.exports = router