const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: [true, 'Flight number is required'],
    unique: true,
    trim: true
  },
  departure: {
    type: String,
    default: 'Singapore',
    enum: ['Singapore'], // force it to always be Singapore
  },
  arrival: {
    type: String,
    default: 'San Diego',
    enum: ['San Diego'], // force it to always be SD
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
    match: [/^\d{2}:\d{2}$/, 'Time must be in HH:MM format']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  seatsAvailable: {
    type: Number,
    required: [true, 'Seats are required'],
    min: [1, 'There must be at least 1 seat']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
