const organizationUtil = require('../models/organization.util');

module.exports = (app) => {
  app.get('/api/organizations', async (req, res) => {
    res.json(await organizationUtil.getAll());
  });

  app.post('/api/organizations', async (req, res) => {
    try {
      let newOrganization = await organizationUtil.create(req.body);
      return res.json(organizationUtil.toJSON(newOrganization));
    } catch (err) {
      res.json({ errors: [{ msg: '' + err }] });
    }
  });

  app.delete('/api/organizations/:_id', async (req, res) => {
    return res.json({});
  });
};
