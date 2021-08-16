const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test("Test GET /api/convert with valid input", function(done) {
    chai
    .request(server)
    .get("/api/convert?input=10L")
    .end((err, res) => {
      assert.equal(res.body.initNum, 10);
      assert.equal(res.body.initUnit, "L");
      assert.equal(res.body.returnNum, 2.64172);
      assert.equal(res.body.returnUnit, "gal");
      assert.equal(res.body.string, "10 liters converts to 2.64172 gallons");
      done();
    });
  });
  test("Test GET /api/convert with invalid unit", function(done) {
    chai
    .request(server)
    .get("/api/convert?input=32g")
    .end((err, res) => {
      assert.equal(res.body.error, "invalid unit");
      done();
    });
  });
  test("Test GET /api/convert with invalid number", function(done) {
    chai
    .request(server)
    .get("/api/convert?input=3/7.2/4kg")
    .end((err, res) => {
      assert.equal(res.body.error, "invalid number");
      done();
    });
  });
  test("Test GET /api/convert with invalid input and number", function(done) {
    chai
    .request(server)
    .get("/api/convert?input=3/7.2/4kilomegagram")
    .end((err, res) => {
      assert.equal(res.body.error, "invalid number and unit");
      done();
    });
  });
  test("Test GET /api/convert with no number", function(done) {
    chai
    .request(server)
    .get("/api/convert?input=kg")
    .end((err, res) => {
      assert.equal(res.body.initNum, 1);
      assert.equal(res.body.initUnit, "kg");
      assert.equal(res.body.returnNum, 2.20462);
      assert.equal(res.body.returnUnit, "lbs");
      assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds");
      done();
    });
  });
});
