const enums = require('../models/enums');
const email = require('../lib/email');

module.exports = (app) => {
  app.get('/api/status', async (req, res) => {
    res.json({ ok: true });
  });
  app.get('/api/enums', async (req, res) => {
    res.json(enums);
  });
  app.post('/api/feedback/submit', async (req, res) => {
    await email.send.feedback(process.env.FEEDBACK_EMAIL, req.body);
    res.json({});
  });
};
