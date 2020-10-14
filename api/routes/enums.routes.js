const enums = require('../models/enums');

module.exports = (app) => {
  app.get('/api/enums', async (req, res) => {
    res.json(enums);
  });
};
