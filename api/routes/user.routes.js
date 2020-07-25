module.exports = (app, passport) => {
  app.get('/', (req, res) => res.json({ test: 1 }));
};
