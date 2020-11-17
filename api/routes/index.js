const fs = require('fs');
const path = require('path');

let routeModules = [];

fs.readdirSync(__dirname).forEach((fn) => {
  if (!fn.includes('.routes')) {
    return;
  }
  routeModules.push(require(path.join(__dirname, fn)));
});

module.exports = (app) => {
  for (let routeMod of routeModules) {
    routeMod(app);
  }
};
