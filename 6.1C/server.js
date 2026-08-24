const express = require('express');
const path = require('path');
const calculator = require('./calculator')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

function handleOperation(operation) {
  return (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    try {
        const result = operation(num1, num2);
        res.status(200).send(`Result: ${result}`);
    } 
    catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
  };
}

app.get('/add', handleOperation(calculator.add));
app.get('/subtract', handleOperation(calculator.subtract));
app.get('/multiply', handleOperation(calculator.multiply));
app.get('/divide', handleOperation(calculator.divide));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;