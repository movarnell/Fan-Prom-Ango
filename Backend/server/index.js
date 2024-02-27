const express = require('express');
const cors = require('cors');
const fs = require('fs');
const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

// Read data from db.json
let seats = JSON.parse(fs.readFileSync('seats.json', 'utf8'));
let theaters = JSON.parse(fs.readFileSync('theaters.json', 'utf8'));
let movies = JSON.parse(fs.readFileSync('movies.json', 'utf8'));

app.get('/seats', (req, res) => {
  if (!seats.length) {
    return res.json({ message: 'No seats available' });
  }
  res.json(seats);
  console.log('sent seats to client');
});

app.get('/theaters', (req, res) => {
  if (!theaters.length) {
    return res.json({ message: 'No theaters available' });
  }
  res.json(theaters);
  console.log('sent theaters to client');
});

app.get('/movies', (req, res) => {
  if (!movies.length) {
    return res.json({ message: 'No movies available' });
  }
  res.json(movies);
  console.log('sent movies to client');
});

app.put('/seats/:id', (req, res) => {
  const { id } = req.params;
  const seat = seats.find((s) => s.id === id);
  if (!seat) {
    return res.status(404).json({ message: 'Seat not found' });
  }
  Object.assign(seat, req.body);

  // Write updated data back to db.json
  fs.writeFileSync('seats.json', JSON.stringify(seats, null, 2));
  res.json(seat);
});

app.put('/theaters/', (req, res) => {
  const theater = req.body;
  theaters.push(theater);

  // Write updated data back to theaters.json
  fs.writeFileSync('theaters.json', JSON.stringify(theaters, null, 2));
  res.json(theater);
});

app.put('/movies/', (req, res) => {
  const movie = req.body;
  movies.push(movie);

  // Write updated data back to movies.json
  fs.writeFileSync('movies.json', JSON.stringify(movies, null, 2));
  res.json(movie);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});