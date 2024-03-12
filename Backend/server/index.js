const express = require('express');
const cors = require('cors');
const fs = require('fs');
const port = process.env.PORT || 3001;
const app = express();
const moviesRoutes = require('./routes/movies');
const theatersRoutes = require('./routes/theaters');
const showtimesRoutes = require('./routes/showtimes');

app.use(cors());
app.use(express.json());

app.use('/movies', moviesRoutes);
app.use('/theaters', theatersRoutes);
app.use('/showtimes', showtimesRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});