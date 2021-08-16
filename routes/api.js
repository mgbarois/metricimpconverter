'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get( 
    (req, res) => { 
      const initNum = convertHandler.getNum(req.query.input);
      const initUnit = convertHandler.getUnit(req.query.input);
      if (initNum === "invalid number" && initUnit === "invalid unit") {
        res.json({ error: "invalid number and unit" });
      }
      else if (initNum === "invalid number and unit") {
        res.json({ error: "invalid number and unit" });
      }
      else if (initNum === "invalid number") {
        res.json({ error: "invalid number" });
      } 
      
      else if (initUnit === "invalid unit") {
        res.json({ error: "invalid unit" });
      }
      else {
        const returnNum = convertHandler.convert(initNum, initUnit);
        const returnUnit = convertHandler.getReturnUnit(initUnit);  
        res.json(convertHandler.getString(initNum, initUnit, returnNum, returnUnit));
      }
    }
  );
};