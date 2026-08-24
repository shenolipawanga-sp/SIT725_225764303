const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const app = require('../server');

describe('Calculator REST API - endpoint tests', () => {

  it('should return 200 and the correct sum for valid input', (done) => {
    chai.request(app)
      .get('/add?num1=10&num2=5')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.include(res.text, '15');
        done();
      });
  });

  it('should return 400 for non-numeric input', (done) => {
    chai.request(app)
      .get('/add?num1=abc&num2=5')
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.include(res.text, 'Error');
        done();
      });
  });

  it('should return 400 when query parameters are missing', (done) => {
    chai.request(app)
      .get('/add')
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 400 when dividing by zero', (done) => {
    chai.request(app)
      .get('/divide?num1=10&num2=0')
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.include(res.text, 'Cannot divide by zero');
        done();
      });
  });

});
