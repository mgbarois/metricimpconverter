
const units = require("../units.js"); 
  
function ConvertHandler() {
 
  this.getNum = function(input) {
    let result;
    if (!input) {
      return "invalid number and unit";
    }
    let grossNumMatch = input.match(/^[\d\.\/]+(?=[a-z]+)/i);
    let fineNumMatch = input.match(/^\d+(?:[\.\/]\d+)*(?=[a-z]+)/i);

    if (!grossNumMatch) {
      // No number
      result = 1;
    } else if (!fineNumMatch) {
      // Invalid number
      result = "invalid number";
    } else if (fineNumMatch[0].match(/\//g) && fineNumMatch[0].match(/\//g).length > 1) {
      // Double fraction
      result = "invalid number";
    } else {
      // Valid number
      result = eval(fineNumMatch[0]);
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let unitMatch = input.match(/[a-z]+$/i);
    if (!unitMatch) {
      return "invalid unit";
    } 
    const u = units.filter(x => x.name.toLowerCase() === unitMatch[0].toLowerCase());
    if (u.length < 1) {
      return "invalid unit";
    } 
    let result = u[0].name;
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const u = units.filter(x => x.name.toLowerCase() === initUnit.toLowerCase());
    let result = u[0].inverse;
    if (result === "l")
    {
      result = "L";
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    const u = units.filter(x => x.name.toLowerCase() === unit.toLowerCase())[0];
    let result = u.fullName;
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    // const galToL = 3.78541;
    // const lbsToKg = 0.453592;
    // const miToKm = 1.60934;
    const u = units.filter(x => x.name.toLowerCase() === initUnit.toLowerCase())[0];
    let result = initNum * u.conversion;
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = {
      initNum, 
      initUnit,
      returnNum,
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    }  
    return result;
  };
  
}

module.exports = ConvertHandler;
