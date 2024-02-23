const express = require('express');
const cors = require('cors');
const fs = require('fs');
const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

// Read data from db.json
let seats = JSON.parse(fs.readFileSync('db.json', 'utf8'));

app.get('/seats', (req, res) => {
  if (!seats.length) {
    return res.json({ message: 'No seats available' });
  }
  res.json(seats);
});

app.put('/seats/:id', (req, res) => {
  const { id } = req.params;
  const seat = seats.find((s) => s.id === id);
  if (!seat) {
    return res.status(404).json({ message: 'Seat not found' });
  }
  Object.assign(seat, req.body);

  // Write updated data back to db.json
  fs.writeFileSync('db.json', JSON.stringify(seats, null, 2));

  res.json(seat);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});