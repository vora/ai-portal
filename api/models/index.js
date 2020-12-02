const fs = require('fs');
const path = require('path');

let models = {};

fs.readdirSync(__dirname).forEach((fn) => {
  if (!fn.includes('.model')) {
    return;
  }
  let name = fn.split('.')[0];
  module.exports[name] = require(path.join(__dirname, fn));
});

module.exports = models;
