const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/', (req, res) => {
    //get theaters from database
    const theaters = JSON.parse(fs.readFileSync('./theaters.json'));
    res.json(theaters);
});

module.exports = router;