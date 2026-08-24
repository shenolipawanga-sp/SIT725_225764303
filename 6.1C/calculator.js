function add(a, b) {
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Both inputs must be valid numbers');
  }
  return a + b;
}

function subtract(a, b) {
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Both inputs must be valid numbers');
  }
  return a - b;
}

function multiply(a, b) {
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Both inputs must be valid numbers');
  }
  return a * b;
}

function divide(a, b) {
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Both inputs must be valid numbers');
  }
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

module.exports = { add, subtract, multiply, divide };