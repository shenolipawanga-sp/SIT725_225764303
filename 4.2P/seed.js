const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/carShowcaseDB');

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

const cars = [
  { make: "Toyota", model: "Corolla", year: 2023, price: 28000, imageUrl: "images/toyota.jpg", fuelType: "Petrol", description: "A reliable, fuel-efficient sedan popular for daily commuting." },
  { make: "Ford", model: "Mustang", year: 2024, price: 62000, imageUrl: "images/ford.jpg", fuelType: "Petrol", description: "An iconic American muscle car known for its performance." },
  { make: "Tesla", model: "Model 3", year: 2024, price: 55000, imageUrl: "images/tesla.jpg", fuelType: "Electric", description: "An electric sedan with autopilot features and long range." }
];

async function seed() {
  await Car.deleteMany({}); // clears old data
  await Car.insertMany(cars);
  console.log('Seeded car data');
  mongoose.connection.close();
}

seed();