const assert = require('chai').assert;
const calculator = require('../calculator');

describe('Calculator function - unit tests', () => {

  it('should correctly add two positive numbers', () => {
    assert.equal(calculator.add(2, 3), 5);
  });

  it('should return zero when adding a negative and its positive counterpart', () => {
    assert.equal(calculator.add(-5, 5), 0);
  });

  it('should correctly divide two numbers', () => {
    assert.equal(calculator.divide(10, 2), 5);
  });

  it('should throw an error when dividing by zero', () => {
    assert.throws(() => calculator.divide(10, 0), 'Cannot divide by zero');
  });

  it('should correctly multiply decimal numbers', () => {
    assert.equal(calculator.multiply(2.5, 4), 10);
  });

});
