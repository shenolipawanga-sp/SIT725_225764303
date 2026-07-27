const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const cars = [
  {
    title: "Toyota Corolla",
    image: "images/toyota.jpg",
    link: "About the Corolla",
    description: "A reliable, fuel-efficient sedan popular for daily commuting."
  },
  {
    title: "Ford Mustang",
    image: "images/ford.jpg",
    link: "About the Mustang",
    description: "An iconic American muscle car known for its performance."
  },
  {
    title: "Tesla Model 3",
    image: "images/tesla.jpg",
    link: "About the Model 3",
    description: "An electric sedan with autopilot features and long range."
  }
];

app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});