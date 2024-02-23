const express = require('express');
const cors= require('cors');
const port = process.env.PORT || 3001;
const app = express();
app.use(cors());

const seats = [
  {
    "seatDescription": "A1",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "1"
  },
  {
    "seatDescription": "A2",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "2"
  },
  {
    "seatDescription": "A3",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "3"
  },
  {
    "seatDescription": "A4",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "4"
  },
  {
    "seatDescription": "A5",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "5"
  },
  {
    "seatDescription": "B1",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "6"
  },
  {
    "seatDescription": "B2",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "7"
  },
  {
    "seatDescription": "B3",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "8"
  },
  {
    "seatDescription": "B4",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "9"
  },
  {
    "seatDescription": "B5",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "10"
  },
  {
    "seatDescription": "C1",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "11"
  },
  {
    "seatDescription": "C2",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "12"
  },
  {
    "seatDescription": "C3",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "13"
  },
  {
    "seatDescription": "C4",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "14"
  },
  {
    "seatDescription": "C5",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "15"
  },
  {
    "seatDescription": "D1",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "16"
  },
  {
    "seatDescription": "D2",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "17"
  },
  {
    "seatDescription": "D3",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "18"
  },
  {
    "seatDescription": "D4",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "19"
  },
  {
    "seatDescription": "D5",
    "seatAvailable": true,
    "seatPrice": 5.99,
    "disabled": false,
    "id": "20"
  }
];

app.get('/seats', (req, res) => {
  if (!seats.length) {
    return res.json({ message: 'No seats available' });
  }
  res.json(seats);
});

app.use(express.json());

app.put('/seats/:id', (req, res) => {
  const { id } = req.params;
  const seat = seats.find((s) => s.id === id);
  if (!seat) {
    return res.status(404).json({ message: 'Seat not found' });
  }
  Object.assign(seat, req.body);
  res.json(seat);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

