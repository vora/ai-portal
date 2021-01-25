const enums = require('../models/enums');
const email = require('../lib/email');

module.exports = (app) => {
  const firewall = require('../lib/firewall')(app);

  firewall.get(
    '/api/status',
    async (req, res) => {
      res.json({ ok: true });
    },
    { public: [] }
  );

  firewall.get(
    '/api/enums',
    async (req, res) => {
      res.json(enums);
    },
    { public: [] }
  );

  firewall.post(
    '/api/feedback/submit',
    async (req, res) => {
      await email.send.feedback(process.env.FEEDBACK_EMAIL, req.body);
      res.json({});
    },
    { public: [] }
  );
};
