let allRoutes = [
  require('./user.routes'),
  require('./resource.routes'),
  require('./enums.routes'),
];

module.exports = (app) => {
  for (let routes of allRoutes) {
    routes(app);
  }
};
