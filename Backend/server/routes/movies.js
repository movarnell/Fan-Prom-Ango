const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/', (req, res) => {
    //get movies from database
    const movies = JSON.parse(fs.readFileSync('./movies.json'));
    res.json(movies);
});

module.exports = router;