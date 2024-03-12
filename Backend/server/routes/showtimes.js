const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/', (req, res) => {
    //get showtimes from database
    const showtimes = JSON.parse(fs.readFileSync('./showtimes.json'));
    res.json(showtimes);
});

router.post('/', (req, res) => {
    //get showtimes from database
    const showtimes = JSON.parse(fs.readFileSync('./showtimes.json'));
    const newShowtime = req.body;
    showtimes.push(newShowtime);
    fs.writeFileSync('./showtimes.json', JSON.stringify(showtimes));
    res.json(showtimes);
});

// Update a seats availability. takes in a seat object with a seatID and a new availability, and updates the seat in the showtimes.json file, according to id parameter
router.put('/:id/seat', (req, res) => {
   const showtimes = JSON.parse(fs.readFileSync('./showtimes.json'));
    const showtimeID = req.params.id;
    const seat = req.body;
    const showtime = showtimes.find(showtime => showtime.id == showtimeID);
    const seatIndex = showtime.seats.findIndex(s => s.id == seat.id);
    showtime.seats[seatIndex].seatAvailable = seat.seatAvailable;
    fs.writeFileSync('./showtimes.json', JSON.stringify(showtimes));
    res.json(showtime);
});
module.exports = router;

