const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const units = require("../units.js"); 


let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite("Function convertHandler.getNum(input)", function() {
    test('No input returns invalid', function() {
      assert.equal(convertHandler.getNum(""), "invalid number and unit");
    });
    test('Whole number input', function() {
      assert.equal(convertHandler.getNum("3gal"), 3);
    });
    test('Decimal input', function() {
      assert.equal(convertHandler.getNum("3.3gal"), 3.3);
    });
    test('Fracional input', function() {
      assert.equal(convertHandler.getNum("3/2gal"), 1.5);
    });
    test('Fraction with decimal input', function() {
      assert.equal(convertHandler.getNum("3/2.5gal"), 1.2);
    });
    test('Double fraction input returns invalid', function() {
      assert.equal(convertHandler.getNum("3/2/2gal"), "invalid number");
    });
    test('No number input returns 1', function() {
      assert.equal(convertHandler.getNum("gal"), 1);
    });
    test('Invalid number', function() {
      assert.equal(convertHandler.getNum("2..3kg"), "invalid number");
    });
  });
  suite("Function convertHandler.getUnit(input)", function() {
    const lowUnits = ["gal", "L", "lbs", "kg", "mi", "km"];
    const upUnits = ["GAL", "l", "LBS", "KG", "MI", "KM"];
    test("All input units lowercase", function() {
      lowUnits.forEach((u, i) => {
        assert.equal(convertHandler.getUnit(`3${u}`), u);
      });
    });
    test("All input units uppercase", function() {
      upUnits.forEach((u, i) => {
        assert.equal(convertHandler.getUnit(`3${u}`), lowUnits[i]);
      });
    });
    test("Invalid unit handling", function() {
        assert.equal(convertHandler.getUnit("3dd"), "invalid unit");
        assert.equal(convertHandler.getUnit("3kms"), "invalid unit");
    });
  })
  suite("Function convertHandler.getReturnUnit(initUnit)", function() {
    test("Unit conversion", function() {
      units.forEach(i => {
        assert.equal(convertHandler.getReturnUnit(i.name), i.inverse);
      });
    });
  });
  suite("Function convertHandler.spellOutUnit(unit)", function() {
    test("Unit spelling out", function() {
      units.forEach(i => {
        assert.equal(convertHandler.spellOutUnit(i.name), i.fullName);
      });
    });
  });
  suite("Function convertHandler.convert(initNum, initUnit)", function() {
    test("gal to L", function() {
      assert.equal(convertHandler.convert(35, "gal"), 132.48935);
    });
    test("L to gal", function() {
      assert.equal(convertHandler.convert(35, "l"), 9.24603);
    });
    test("lbs to kg", function() {
      assert.equal(convertHandler.convert(35, "lbs"), 15.87572);
    });
    test("kg to lbs", function() {
      assert.equal(convertHandler.convert(35, "kg"), 77.16185);
    });
    test("mi to km", function() {
      assert.equal(convertHandler.convert(35, "mi"), 56.3269);
    });
    test("km to mi", function() {
      assert.equal(convertHandler.convert(35, "km"), 21.74805);
    });
  });
});