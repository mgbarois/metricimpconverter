const units = [
  {
    name: "gal",
    fullName: "gallons",
    inverse: "L",
    conversion: 3.78541,
  },
  {
    name: "L",
    fullName: "liters",
    inverse: "gal",
    conversion: 1/3.78541,
  },
  {
    name: "lbs",
    fullName: "pounds",
    inverse: "kg",
    conversion: 0.453592,
  },
  {
    name: "kg",
    fullName: "kilograms",
    inverse: "lbs",
    conversion: 1/0.453592,
  },
  {
    name: "mi",
    fullName: "miles",
    inverse: "km",
    conversion: 1.60934,
  },
  {
    name: "km",
    fullName: "kilometers",
    inverse: "mi",
    conversion: 1/1.60934,
  }
];

module.exports = units;