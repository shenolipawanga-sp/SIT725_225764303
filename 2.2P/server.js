const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.send("Error: Please provide valid numbers using query parameters 'num1' and 'num2'.");
  }

  const sum = num1 + num2;
  res.send(`The sum of ${num1} and ${num2} is: ${sum}`);
});

app.get('/subtract', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.send("Error: Please provide valid numbers using query parameters 'num1' and 'num2'.");
  }

  const result = num1 - num2;
  res.send(`${num1} minus ${num2} is: ${result}`);
});

app.get('/multiply', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.send("Error: Please provide valid numbers using query parameters 'num1' and 'num2'.");
  }

  const result = num1 * num2;
  res.send(`${num1} multiplied by ${num2} is: ${result}`);
});

app.get('/divide', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.send("Error: Please provide valid numbers using query parameters 'num1' and 'num2'.");
  }

  if (num2 === 0) {
    return res.send("Error: Cannot divide by zero.");
  }

  const result = num1 / num2;
  res.send(`${num1} divided by ${num2} is: ${result}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});