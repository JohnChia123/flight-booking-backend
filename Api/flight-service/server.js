const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

const flightRoutes = require('./routes/flightRoutes');
app.use('/flights', flightRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
  
/*
Browser → GET /flights →
server.js → forwards to → flightRoutes.js →
calls → flightController.getAllFlights() →
uses → Flight.find() →
queries MongoDB → returns flights →
res.json(flights) → Browser gets JSON array
*/

