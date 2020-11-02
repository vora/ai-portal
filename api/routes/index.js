let allRoutes = [
  require('./meta.routes'),
  require('./user.routes'),
  require('./resource.routes'),
  require('./enums.routes'),
];

module.exports = (app) => {
  for (let routes of allRoutes) {
    routes(app);
  }
};
