let allRoutes = [require('./user.routes')];

module.exports = (app, passport) => {
  for (let routes of allRoutes) {
    routes(app, passport);
  }
};
