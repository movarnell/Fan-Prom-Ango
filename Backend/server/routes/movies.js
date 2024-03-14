const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/', (req, res) => {
    //get movies from database
    const movies = JSON.parse(fs.readFileSync('./movies.json'));
    res.json(movies);
});

router.post('/', (req, res) => {
    //get movies from database
    const movies = JSON.parse(fs.readFileSync('./movies.json'));
    const newMovie = req.body;
    movies.push(newMovie);
    fs.writeFileSync('./movies.json', JSON.stringify(movies));
    res.json(movies);
});

module.exports = router;