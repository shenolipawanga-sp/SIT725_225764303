const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/carShowcaseDB');
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

const CarSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  imageUrl: String,
  fuelType: String,
  description: String
});
const Car = mongoose.model('Car', CarSchema);


app.get('/api/cars', async (req, res) => {
  const cars = await Car.find({});
  res.json({ statusCode: 200, data: cars, message: 'Success' });
});


app.post('/api/cars', async (req, res) => {
  try {
    const { make, model, year, price, imageUrl, fuelType, description } = req.body;
    const car = new Car({ make, model, year, price, imageUrl, fuelType, description });
    await car.save();
    res.status(201).json({ statusCode: 201, data: car, message: 'Car added' });
  } catch (err) {
    res.status(400).json({ statusCode: 400, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});