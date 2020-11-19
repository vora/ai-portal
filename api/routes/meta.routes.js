const enums = require('../models/enums');

module.exports = (app) => {
  app.get('/api/status', async (req, res) => {
    res.json({ ok: true });
  });
  app.get('/api/enums', async (req, res) => {
    res.json(enums);
  });
};
