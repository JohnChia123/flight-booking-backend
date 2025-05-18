const Flight = require('../models/Flight');
const { publishToQueue } = require('../utils/rabbit');

console.log('🐛 FLIGHT SERVICE RELOADED');

exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find({ departure: "Singapore", arrival: "San Diego" });
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    await publishToQueue('flight_created', flight);
    console.log('Flight created:', flight);
    res.status(201).json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get flight by ID
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    res.json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update flight by ID
exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    res.json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete flight by ID
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    res.json({ message: 'Flight deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

